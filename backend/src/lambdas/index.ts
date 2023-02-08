import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {createAccountLambdaIntegrationV1, createAccountLambdaV1} from './account'
import {createEventsLambdaIntegrationV1, createEventsLambdaV1} from './events'
import {Policy, PolicyStatement} from 'aws-cdk-lib/aws-iam'
import {Rule} from 'aws-cdk-lib/aws-events'
import {LambdaFunction, SqsQueue} from 'aws-cdk-lib/aws-events-targets'
import {IQueue} from 'aws-cdk-lib/aws-sqs'
import {SqsEventSource} from 'aws-cdk-lib/aws-lambda-event-sources'

interface HandlersProps {
  accountsTable: ITable
  eventsTable: ITable
  deploymentEnvironment: DeploymentEnvironment
  eventBusName: string
  eventBusArn: string
  accountRule: Rule
  eventQueue: IQueue
}

export class Lambdas extends Construct {
  public readonly accountLambdaV1: NodejsFunction
  public accountLambdaIntegrationV1: LambdaIntegration
  public readonly eventsLambdaV1: NodejsFunction
  public eventsLambdaIntegrationV1: LambdaIntegration

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    const {
      accountsTable,
      eventsTable,
      deploymentEnvironment,
      eventBusArn,
      accountRule,
      eventQueue,
    } = props

    this.accountLambdaV1 = createAccountLambdaV1({
      scope: this,
      table: accountsTable,
      deploymentEnvironment,
      eventBusName: eventBusArn,
    })

    this.accountLambdaIntegrationV1 = createAccountLambdaIntegrationV1({
      scope: this,
      lambda: this.accountLambdaV1,
      deploymentEnvironment,
    })

    this.eventsLambdaV1 = createEventsLambdaV1({
      scope: this,
      table: eventsTable,
      deploymentEnvironment,
    })

    this.eventsLambdaIntegrationV1 = createEventsLambdaIntegrationV1({
      scope: this,
      lambda: this.eventsLambdaV1,
      deploymentEnvironment,
    })

    const policyStatement = new PolicyStatement({
      actions: ['events:Put*'],
      resources: [eventBusArn],
    })

    this.accountLambdaV1.role?.attachInlinePolicy(
      new Policy(this, 'EventBusPolicy', {
        statements: [policyStatement],
      }),
    )

    accountRule.addTarget(new LambdaFunction(this.eventsLambdaV1))
    accountRule.addTarget(new SqsQueue(eventQueue))
    this.eventsLambdaV1.addEventSource(new SqsEventSource(eventQueue, {batchSize: 1}))
  }
}
