import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  Deployment,
  LambdaIntegration,
  LambdaRestApi,
  MethodOptions,
  ResourceOptions,
  Stage,
} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'

import CONFIG from '../../config'
import {DeploymentEnvironment} from '../../types'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

interface CreateAuthProps {
  scope: Construct
  authLambdaV1: IFunction
  authLambdaIntegrationV1: LambdaIntegration
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export function createAuthApi(props: CreateAuthProps): LambdaRestApi {
  const {scope, authLambdaV1, certificate, deploymentEnvironment, userPool} = props

  const restApiName = `Auth Api (${deploymentEnvironment}) Version 1`

  const authorizer = new CognitoUserPoolsAuthorizer(scope, 'AuthApiAuthorizer', {
    cognitoUserPools: [userPool],
    authorizerName: 'AuthAPiAuthorizer',
    identitySource: 'method.request.header.Authorization',
  })

  const methodOptions: MethodOptions = {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {
      authorizerId: authorizer.authorizerId,
    },
  }

  const optionsWithCors: ResourceOptions = {
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
    },
  }

  const api = new LambdaRestApi(scope, restApiName, {
    deploy: false,
    restApiName,
    handler: authLambdaV1,
    proxy: false,
    domainName: {
      domainName: `${CONFIG.API_URL}`,
      certificate,
    },
  })

  authLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  const deployment = new Deployment(scope, 'AuthApiDeployment', {
    api,
  })

  const stage = new Stage(scope, 'AuthApiStage', {
    deployment,
    stageName: deploymentEnvironment.toLowerCase(),
  })

  api.deploymentStage = stage

  authorizer._attachToApi(api)

  const root = api.root.addResource('v1').addResource('auth', optionsWithCors)

  const register = root.addResource('register', optionsWithCors)
  register.addMethod('POST', new LambdaIntegration(authLambdaV1), methodOptions)

  const login = root.addResource('login', optionsWithCors)
  login.addMethod('POST', new LambdaIntegration(authLambdaV1), methodOptions)

  const forgotPassword = root.addResource('forgot-password', optionsWithCors)
  forgotPassword.addMethod('POST', new LambdaIntegration(authLambdaV1), methodOptions)

  const completeForgotPassword = root.addResource(
    'complete-forgot-password',
    optionsWithCors,
  )
  completeForgotPassword.addMethod(
    'POST',
    new LambdaIntegration(authLambdaV1),
    methodOptions,
  )

  const confirmSignUp = root.addResource('confirm-sign-up', optionsWithCors)
  confirmSignUp.addMethod('POST', new LambdaIntegration(authLambdaV1), methodOptions)

  const resendConfirmEmail = root.addResource('resend-confirm-email', optionsWithCors)
  resendConfirmEmail.addMethod('POST', new LambdaIntegration(authLambdaV1), methodOptions)

  const getUserInfo = root.addResource('get-user-info', optionsWithCors)
  getUserInfo.addMethod('GET', new LambdaIntegration(authLambdaV1), methodOptions)

  return api
}
