import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {ARecord, IHostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'
import {Construct} from 'constructs'

import CONFIG from '../../config'
import {DeploymentEnvironment} from '../../types'

interface EventsApiProps {
  scope: Construct
  eventsLambdaV1: IFunction
  eventsLambdaIntegrationV1: LambdaIntegration
  stage: DeploymentEnvironment
  userPool: UserPool
  certificate: ICertificate
  hostedZone: IHostedZone
}

export class EventsApi {
  public eventsApi: RestApi
  constructor(props: EventsApiProps) {
    this.eventsApi = this.createEventsApi(props)
  }

  private createEventsApi(props: EventsApiProps): RestApi {
    const {scope, eventsLambdaV1, stage, userPool, certificate, hostedZone} = props

    const restApiName = `${CONFIG.STACK_PREFIX} Events Api (${stage}) Version 1`

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
        domainName: `${CONFIG.EVENTS_API_URL}`,
        certificate,
      },
    })

    eventsLambdaV1.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'))

    authorizer._attachToApi(api)

    const root = api.root.addResource('v1', optionsWithCors)

    root
      .addResource('get-all-events')
      .addMethod('GET', new LambdaIntegration(eventsLambdaV1), methodOptions)

    const getEventsById = root.addResource('get-events-for-account')
    getEventsById
      .addResource('{id}')
      .addMethod('GET', new LambdaIntegration(eventsLambdaV1), methodOptions)

    new ARecord(scope, `${CONFIG.STACK_PREFIX}EventsApiAliasRecord`, {
      recordName: CONFIG.EVENTS_API_URL,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new ApiGateway(api)),
    })

    return api
  }
}
