import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {AccountLambda, AccountLambdaIntegration} from './account'
import {EventsLambda, EventsLambdaIntegration} from './events'
import {Policy, PolicyStatement} from 'aws-cdk-lib/aws-iam'
import {Rule} from 'aws-cdk-lib/aws-events'
import {LambdaFunction, SqsQueue} from 'aws-cdk-lib/aws-events-targets'
import {IQueue} from 'aws-cdk-lib/aws-sqs'
import {SqsEventSource} from 'aws-cdk-lib/aws-lambda-event-sources'

interface HandlersProps {
  accountsTable: ITable
  eventsTable: ITable
  stage: DeploymentEnvironment
  eventBusName: string
  eventBusArn: string
  accountRule: Rule
  eventQueue: IQueue
  deadLetterQueue: IQueue
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
      stage,
      eventBusArn,
      accountRule,
      eventQueue,
      deadLetterQueue,
    } = props

    const {accountLambdaV1} = new AccountLambda({
      scope: this,
      table: accountsTable,
      stage,
      eventBusName: eventBusArn,
    })
    this.accountLambdaV1 = accountLambdaV1

    const {accountLambdaIntegrationV1} = new AccountLambdaIntegration({
      scope: this,
      lambda: accountLambdaV1,
      stage: stage,
    })
    this.accountLambdaIntegrationV1 = accountLambdaIntegrationV1

    const {eventsLambdaV1} = new EventsLambda({
      scope: this,
      table: eventsTable,
      stage,
      deadLetterQueue,
    })
    this.eventsLambdaV1 = eventsLambdaV1

    const {eventsLambdaIntegrationV1} = new EventsLambdaIntegration({
      scope: this,
      lambda: eventsLambdaV1,
      stage,
    })
    this.eventsLambdaIntegrationV1 = eventsLambdaIntegrationV1

    const policyStatement = new PolicyStatement({
      actions: ['events:Put*'],
      resources: [eventBusArn],
    })

    this.accountLambdaV1.role?.attachInlinePolicy(
      new Policy(this, 'EventBusPolicy', {
        statements: [policyStatement],
      }),
    )

    accountRule.addTarget(new LambdaFunction(eventsLambdaV1))
    accountRule.addTarget(new SqsQueue(eventQueue))
    eventsLambdaV1.addEventSource(new SqsEventSource(eventQueue, {batchSize: 1}))
  }
}
