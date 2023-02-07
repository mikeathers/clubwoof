import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

interface AccountLambdaProps {
  scope: Construct
  table: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export function createAccountLambdaV1(props: AccountLambdaProps): NodejsFunction {
  const {scope, deploymentEnvironment, table} = props
  const lambdaName = `${CONFIG.STACK_PREFIX}AccountLambda-${deploymentEnvironment}`

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

  const accountLambda = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../functions/account/index.ts'),
    ...lambdaProps,
  })

  table.grantReadWriteData(accountLambda)

  return accountLambda
}

interface CreateAccountLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  deploymentEnvironment: DeploymentEnvironment
}

export function createAccountLambdaIntegrationV1(
  props: CreateAccountLambdaIntegrationProps,
): LambdaIntegration {
  const {scope, lambda, deploymentEnvironment} = props

  const accountLambdaV1 = new Version(
    scope,
    `${CONFIG.STACK_PREFIX}AccountLambda${deploymentEnvironment}V1`,
    {
      lambda,
    },
  )

  const accountLambdaV1Alias = new Alias(
    scope,
    `${CONFIG.STACK_PREFIX}AccountLambda${deploymentEnvironment}V1Alias`,
    {
      aliasName: `${CONFIG.STACK_PREFIX}AccountLambdaV1`,
      version: accountLambdaV1,
    },
  )
  return new LambdaIntegration(accountLambdaV1Alias)
}
