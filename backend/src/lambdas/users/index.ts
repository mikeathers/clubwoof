import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'

interface UserLambdaProps {
  scope: Construct
  table: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export function createUsersLambdaV1(props: UserLambdaProps): NodejsFunction {
  const {scope, deploymentEnvironment, table} = props
  const lambdaName = `UsersLambda-${deploymentEnvironment}`

  const lambdaProps: NodejsFunctionProps = {
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

  const usersLambda = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../functions/users/index.ts'),
    ...lambdaProps,
  })

  table.grantReadWriteData(usersLambda)

  return usersLambda
}

interface CreateUsersLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  deploymentEnvironment: DeploymentEnvironment
}

export function createUsersLambdaIntegrationV1(
  props: CreateUsersLambdaIntegrationProps,
): LambdaIntegration {
  const {scope, lambda, deploymentEnvironment} = props

  const usersLambdaV1 = new Version(scope, `UsersLambda${deploymentEnvironment}V1`, {
    lambda,
  })

  const usersLambdaV1Alias = new Alias(
    scope,
    `UsersLambda${deploymentEnvironment}V1Alias`,
    {
      aliasName: 'UsersLambdaV1',
      version: usersLambdaV1,
    },
  )
  return new LambdaIntegration(usersLambdaV1Alias)
}
