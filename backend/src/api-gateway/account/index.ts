import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  LambdaRestApi,
  MethodOptions,
  ResourceOptions,
  RestApi,
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

  const restApiName = `${CONFIG.STACK_PREFIX} Account Api (${deploymentEnvironment}) Version 1`

  const authorizer = new CognitoUserPoolsAuthorizer(
    scope,
    `${CONFIG.STACK_PREFIX}AccountApiAuthorizer`,
    {
      cognitoUserPools: [userPool],
      authorizerName: `${CONFIG.STACK_PREFIX}AccountApiAuthorizer`,
      identitySource: 'method.request.header.Authorization',
    },
  )

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
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
      ],
      allowCredentials: true,
    },
  }

  const api = new RestApi(scope, restApiName, {
    restApiName,
    domainName: {
      domainName: `${CONFIG.ACCOUNT_API_URL}`,
      certificate,
    },
  })

  accountLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  authorizer._attachToApi(api)

  const root = api.root.addResource('v1', optionsWithCors)

  root
    .addResource('get-all-accounts')
    .addMethod('GET', new LambdaIntegration(accountLambdaV1), methodOptions)

  root
    .addResource('create-account')
    .addMethod('POST', new LambdaIntegration(accountLambdaV1), methodOptions)

  const getAccountById = root.addResource('get-account-by-id')
  getAccountById
    .addResource('{id}')
    .addMethod('GET', new LambdaIntegration(accountLambdaV1), methodOptions)

  root
    .addResource('update-account')
    .addMethod('PUT', new LambdaIntegration(accountLambdaV1), methodOptions)

  const deleteAccount = root.addResource('delete-account')
  deleteAccount
    .addResource('{id}')
    .addMethod('DELETE', new LambdaIntegration(accountLambdaV1), methodOptions)

  new ARecord(scope, `${CONFIG.STACK_PREFIX}AccountApiAliasRecord`, {
    recordName: CONFIG.ACCOUNT_API_URL,
    zone: hostedZone,
    target: RecordTarget.fromAlias(new ApiGateway(api)),
  })

  return api
}
