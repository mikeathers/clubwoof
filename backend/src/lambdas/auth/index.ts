import {join} from 'path'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'

interface AuthLambdaProps {
  scope: Construct
  deploymentEnvironment: DeploymentEnvironment
}

export function createAuthLambdaV1(props: AuthLambdaProps): NodejsFunction {
  const {scope, deploymentEnvironment} = props
  const lambdaName = `AuthLambda-${deploymentEnvironment}`

  const lambdaProps: NodejsFunctionProps = {
    functionName: lambdaName,
    bundling: {
      externalModules: ['aws-sdk'],
    },
    environment: {
      PRIMARY_KEY: 'id',
    },
    runtime: Runtime.NODEJS_14_X,
  }

  const authLambda = new NodejsFunction(scope, lambdaName, {
    entry: join(__dirname, '../../functions/auth/index.ts'),
    ...lambdaProps,
  })

  return authLambda
}

interface CreateAuthLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  deploymentEnvironment: DeploymentEnvironment
}

export function createAuthLambdaIntegrationV1(
  props: CreateAuthLambdaIntegrationProps,
): LambdaIntegration {
  const {scope, lambda, deploymentEnvironment} = props

  const authLambdaV1 = new Version(scope, `AuthLambda${deploymentEnvironment}V1`, {
    lambda,
  })

  const authLambdaV1Alias = new Alias(
    scope,
    `AuthLambda${deploymentEnvironment}V1Alias`,
    {
      aliasName: 'AuthLambdaV1',
      version: authLambdaV1,
    },
  )
  return new LambdaIntegration(authLambdaV1Alias)
}
