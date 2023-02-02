import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Runtime} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'

interface UserHandlerProps {
  scope: Construct
  table: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export function createUsersHandler(props: UserHandlerProps): NodejsFunction {
  const {scope, deploymentEnvironment, table} = props
  const lambdaName = `UsersLambdaFunction-${deploymentEnvironment}`

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

  const usersFunction = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../lambdas/users/index.ts'),
    ...handleProps,
  })

  table.grantReadWriteData(usersFunction)

  return usersFunction
}

export function createUsersHandlerIntegration(
  handler: NodejsFunction,
): LambdaIntegration {
  return new LambdaIntegration(handler)
}
