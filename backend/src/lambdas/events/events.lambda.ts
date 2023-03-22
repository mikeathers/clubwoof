import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'
import {IQueue} from 'aws-cdk-lib/aws-sqs'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

interface EventsLambdaProps {
  scope: Construct
  table: ITable
  stage: DeploymentEnvironment
  deadLetterQueue: IQueue
}

export class EventsLambda {
  public eventsLambdaV1: NodejsFunction

  constructor(props: EventsLambdaProps) {
    this.eventsLambdaV1 = this.createEventsLambda(props)
  }

  private createEventsLambda(props: EventsLambdaProps): NodejsFunction {
    const {scope, stage, table, deadLetterQueue} = props
    const lambdaName = `${CONFIG.STACK_PREFIX}EventsLambda-${stage}`

    const handleProps: NodejsFunctionProps = {
      functionName: lambdaName,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        PRIMARY_KEY: 'id',
        TABLE_NAME: table.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
      deadLetterQueueEnabled: true,
      deadLetterQueue,
    }

    const eventsLambda = new NodejsFunction(scope, lambdaName, {
      entry: join(__dirname, '../../functions/events/index.ts'),
      ...handleProps,
    })

    table.grantReadWriteData(eventsLambda)

    return eventsLambda
  }
}

interface EventsLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  stage: DeploymentEnvironment
}

export class EventsLambdaIntegration {
  public eventsLambdaIntegrationV1: LambdaIntegration
  constructor(props: EventsLambdaIntegrationProps) {
    this.eventsLambdaIntegrationV1 = this.createEventsLambdaIntegration(props)
  }

  private createEventsLambdaIntegration(
    props: EventsLambdaIntegrationProps,
  ): LambdaIntegration {
    const {scope, lambda, stage} = props

    const eventsLambdaV1 = new Version(
      scope,
      `${CONFIG.STACK_PREFIX}EventsLambda${stage}V1`,
      {
        lambda,
      },
    )

    const eventsLambdaV1Alias = new Alias(
      scope,
      `${CONFIG.STACK_PREFIX}EventsLambda${stage}V1Alias`,
      {
        aliasName: `${CONFIG.STACK_PREFIX}EventsLambdaV1`,
        version: eventsLambdaV1,
      },
    )
    return new LambdaIntegration(eventsLambdaV1Alias)
  }
}
