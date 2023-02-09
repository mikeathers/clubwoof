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
  eventLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
  certificate: ICertificate
  hostedZone: IHostedZone
}

export function createEventsApi(props: CreateAccountApiProps): LambdaRestApi {
  const {scope, eventLambdaV1, deploymentEnvironment, userPool, certificate, hostedZone} =
    props

  const restApiName = `${CONFIG.STACK_PREFIX} Events Api (${deploymentEnvironment}) Version 1`

  const authorizer = new CognitoUserPoolsAuthorizer(
    scope,
    `${CONFIG.STACK_PREFIX}EventsApiAuthorizer`,
    {
      cognitoUserPools: [userPool],
      authorizerName: `${CONFIG.STACK_PREFIX}EventsApiAuthorizer`,
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

  eventLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

  authorizer._attachToApi(api)

  const root = api.root.addResource('v1', optionsWithCors)

  root
    .addResource('get-all-events')
    .addMethod('GET', new LambdaIntegration(eventLambdaV1), methodOptions)

  const getEventsById = root.addResource('get-events-for-account')
  getEventsById.addMethod('GET', new LambdaIntegration(eventLambdaV1), methodOptions)

  new ARecord(scope, `${CONFIG.STACK_PREFIX}EventsApiAliasRecord`, {
    recordName: CONFIG.ACCOUNT_API_URL,
    zone: hostedZone,
    target: RecordTarget.fromAlias(new ApiGateway(api)),
  })

  return api
}
