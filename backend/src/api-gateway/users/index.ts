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
  usersLambdaV1: IFunction
  usersLambdaIntegrationV1: LambdaIntegration
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export function createUsersApi(props: CreateUsersProps): LambdaRestApi {
  const {scope, usersLambdaV1, certificate, deploymentEnvironment, userPool} = props

  const apiName = `Users Api (${deploymentEnvironment}) Version 1`

  const api = new LambdaRestApi(scope, apiName, {
    deploy: false,
    restApiName: apiName,
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

  const users = api.root.addResource('v1').addResource('users', optionsWithCors)
  users.addMethod('GET', new LambdaIntegration(usersLambdaV1), methodOptions)
  users.addMethod('POST', new LambdaIntegration(usersLambdaV1), methodOptions)

  const singleUser = users.addResource('{id}')
  singleUser.addMethod('GET', new LambdaIntegration(usersLambdaV1), methodOptions)
  singleUser.addMethod('DELETE', new LambdaIntegration(usersLambdaV1), methodOptions)
  singleUser.addMethod('PUT', new LambdaIntegration(usersLambdaV1), methodOptions)

  return api
}
