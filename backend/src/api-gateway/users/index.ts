import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {
  AuthorizationType,
  CfnAuthorizer,
  LambdaIntegration,
  LambdaRestApi,
  MethodOptions,
} from 'aws-cdk-lib/aws-apigateway'
import CONFIG from '../../config'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {DeploymentEnvironment} from '../../types'
import {Construct} from 'constructs'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

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
  const apiName = `Users Api (${deploymentEnvironment})`
  const api = new LambdaRestApi(scope, apiName, {
    restApiName: apiName,
    handler: usersHandler,
    proxy: false,
    domainName: {
      domainName: CONFIG.API_URL,
      certificate,
    },
  })

  const authorizer = new CfnAuthorizer(scope, 'ApiAuthorizer', {
    restApiId: api.restApiId,
    name: 'User Api',
    type: 'COGNITO_USER_POOLS',
    identitySource: 'method.request.header.Authorization',
    providerArns: [userPool.userPoolArn],
  })

  const methodOptions: MethodOptions = {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {
      authorizerId: authorizer.ref,
    },
  }

  const users = api.root.addResource('users')
  users.addMethod('GET', usersLambdaIntegration, methodOptions)
  users.addMethod('POST', usersLambdaIntegration, methodOptions)

  const singleUser = api.root.addResource('{id}')
  singleUser.addMethod('GET', usersLambdaIntegration, methodOptions)
  singleUser.addMethod('DELETE', usersLambdaIntegration, methodOptions)
  singleUser.addMethod('PUT', usersLambdaIntegration, methodOptions)

  return api
}
