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
import CONFIG from '../../config'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {DeploymentEnvironment} from '../../types'
import {Construct} from 'constructs'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'

interface CreateUsersProps {
  scope: Construct
  usersHandler: IFunction
  usersLambdaIntegration: LambdaIntegration
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export function createUsersApi(props: CreateUsersProps): LambdaRestApi {
  const {
    scope,
    usersHandler,
    usersLambdaIntegration,
    certificate,
    deploymentEnvironment,
    userPool,
  } = props

  const apiName = `Users Api (${deploymentEnvironment}) Version 1`

  const api = new LambdaRestApi(scope, apiName, {
    deploy: false,
    restApiName: apiName,
    handler: usersHandler,
    proxy: false,
    domainName: {
      domainName: `${CONFIG.API_URL}/v1`,
      certificate,
    },
  })

  usersHandler.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  const deployment = new Deployment(scope, 'UserApiDeployment', {
    api,
  })

  const stage = new Stage(scope, 'UserApiStage', {
    deployment,
    stageName: deploymentEnvironment,
  })

  api.deploymentStage = stage

  const authorizer = new CognitoUserPoolsAuthorizer(scope, 'UsersAPIAuthorizer', {
    cognitoUserPools: [userPool],
    authorizerName: 'UsersAPIAuthorizer',
    identitySource: 'method.request.header.Authorization',
  })

  authorizer._attachToApi(api)

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

  const users = api.root.addResource('users', optionsWithCors)
  users.addMethod('GET', usersLambdaIntegration, methodOptions)
  users.addMethod('POST', usersLambdaIntegration, methodOptions)

  const singleUser = api.root.addResource('{id}')
  singleUser.addMethod('GET', usersLambdaIntegration, methodOptions)
  singleUser.addMethod('DELETE', usersLambdaIntegration, methodOptions)
  singleUser.addMethod('PUT', usersLambdaIntegration, methodOptions)

  return api
}
