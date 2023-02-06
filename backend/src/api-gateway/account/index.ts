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
import {DeploymentEnvironment} from '../../types'
import {Construct} from 'constructs'
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {ARecord, IHostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'

interface CreateAccountApiProps {
  scope: Construct
  accountLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
  certificate: ICertificate
  hostedZone: IHostedZone
}

export function createAccountApi(props: CreateAccountApiProps): LambdaRestApi {
  const {
    scope,
    accountLambdaV1,
    deploymentEnvironment,
    userPool,
    certificate,
    hostedZone,
  } = props

  const restApiName = `Account Api (${deploymentEnvironment}) Version 1`

  const authorizer = new CognitoUserPoolsAuthorizer(scope, 'AccountApiAuthorizer', {
    cognitoUserPools: [userPool],
    authorizerName: 'AccountApiAuthorizer',
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
    handler: accountLambdaV1,
    proxy: false,
    domainName: {
      domainName: `${CONFIG.ACCOUNT_API_URL}`,
      certificate,
    },
  })

  accountLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  const deployment = new Deployment(scope, 'UserApiDeployment', {
    api,
  })

  const stage = new Stage(scope, 'UserApiStage', {
    deployment,
    stageName: deploymentEnvironment.toLowerCase(),
  })

  api.deploymentStage = stage

  authorizer._attachToApi(api)

  const root = api.root.addResource('v1').addResource('account', optionsWithCors)

  root.addMethod('GET', new LambdaIntegration(accountLambdaV1), methodOptions)
  root.addMethod('POST', new LambdaIntegration(accountLambdaV1), methodOptions)

  const getUserById = root.addResource('{id}')
  getUserById.addMethod('GET', new LambdaIntegration(accountLambdaV1), methodOptions)
  getUserById.addMethod('DELETE', new LambdaIntegration(accountLambdaV1), methodOptions)
  getUserById.addMethod('PUT', new LambdaIntegration(accountLambdaV1), methodOptions)

  new ARecord(scope, 'AccountApiAliasRecord', {
    recordName: CONFIG.ACCOUNT_API_URL,
    zone: hostedZone,
    target: RecordTarget.fromAlias(new ApiGateway(api)),
  })

  return api
}
