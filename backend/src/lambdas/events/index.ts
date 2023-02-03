import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'

interface EventsLambdaProps {
  scope: Construct
  table: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export function createEventsLambda(props: EventsLambdaProps): NodejsFunction {
  const {scope, deploymentEnvironment, table} = props
  const lambdaName = `EventsLambda-${deploymentEnvironment}`

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
  }

  const eventsLambda = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../functions/events/index.ts'),
    ...handleProps,
  })

  table.grantReadWriteData(eventsLambda)

  return eventsLambda
}

interface CreateEventsLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  deploymentEnvironment: DeploymentEnvironment
}

export function createEventsLambdaIntegrationV1(
  props: CreateEventsLambdaIntegrationProps,
): LambdaIntegration {
  const {scope, lambda, deploymentEnvironment} = props

  const eventsLambdaV1 = new Version(scope, `EventsLambda${deploymentEnvironment}V1`, {
    lambda,
  })

  const eventsLambdaV1Alias = new Alias(
    scope,
    `EventsLambda${deploymentEnvironment}V1Alias`,
    {
      aliasName: 'EventsLambdaV1',
      version: eventsLambdaV1,
    },
  )
  return new LambdaIntegration(eventsLambdaV1Alias)
}
