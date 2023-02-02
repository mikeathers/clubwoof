import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Runtime} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'

interface EventsHandlerProps {
  scope: Construct
  table: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export function createEventsHandler(props: EventsHandlerProps): NodejsFunction {
  const {scope, deploymentEnvironment, table} = props
  const lambdaName = `EventsLambdaFunction-${deploymentEnvironment}`

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

  const eventsFunction = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../lambdas/events/index.ts'),
    ...handleProps,
  })

  table.grantReadWriteData(eventsFunction)

  return eventsFunction
}

export function createEventsHandlerIntegration(
  handler: NodejsFunction,
): LambdaIntegration {
  return new LambdaIntegration(handler)
}
