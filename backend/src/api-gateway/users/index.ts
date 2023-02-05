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
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

interface CreateUsersProps {
  scope: Construct
  usersLambdaV1: IFunction
  usersLambdaIntegrationV1: LambdaIntegration
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export function createUsersApi(props: CreateUsersProps): LambdaRestApi {
  const {scope, usersLambdaV1, certificate, deploymentEnvironment, userPool} = props

  const restApiName = `Users Api (${deploymentEnvironment}) Version 1`

  const authorizer = new CognitoUserPoolsAuthorizer(scope, 'UsersApiAuthorizer', {
    cognitoUserPools: [userPool],
    authorizerName: 'UsersApiAuthorizer',
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
    handler: usersLambdaV1,
    proxy: false,
    domainName: {
      domainName: `${CONFIG.API_URL}`,
      certificate,
    },
  })

  usersLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  const deployment = new Deployment(scope, 'UserApiDeployment', {
    api,
  })

  const stage = new Stage(scope, 'UserApiStage', {
    deployment,
    stageName: deploymentEnvironment.toLowerCase(),
  })

  api.deploymentStage = stage

  authorizer._attachToApi(api)

  const root = api.root.addResource('v1').addResource('users', optionsWithCors)

  root.addMethod('GET', new LambdaIntegration(usersLambdaV1), methodOptions)
  root.addMethod('POST', new LambdaIntegration(usersLambdaV1), methodOptions)

  const getUserById = root.addResource('{id}')
  getUserById.addMethod('GET', new LambdaIntegration(usersLambdaV1), methodOptions)
  getUserById.addMethod('DELETE', new LambdaIntegration(usersLambdaV1), methodOptions)
  getUserById.addMethod('PUT', new LambdaIntegration(usersLambdaV1), methodOptions)

  return api
}
