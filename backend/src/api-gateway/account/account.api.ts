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
import {Construct} from 'constructs'
import {ServicePrincipal} from 'aws-cdk-lib/aws-iam'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {ARecord, IHostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'

import CONFIG from '../../config'
import {DeploymentEnvironment} from '../../types'

interface AccountApiProps {
  scope: Construct
  accountLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  stage: DeploymentEnvironment
  certificate: ICertificate
  hostedZone: IHostedZone
}

export class AccountApi {
  public accountApi: RestApi
  constructor(props: AccountApiProps) {
    this.accountApi = this.createAccountApi(props)
  }

  private createAccountApi(props: AccountApiProps): RestApi {
    const {scope, accountLambdaV1, stage, certificate, hostedZone} = props
    const userPool = UserPool.fromUserPoolId(scope, 'UserPool', 'eu-west-2_ben0SckmT')

    const restApiName = `${CONFIG.STACK_PREFIX} Account Api (${stage}) Version 1`

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
}
