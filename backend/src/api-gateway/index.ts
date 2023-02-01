import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  LambdaRestApi,
} from 'aws-cdk-lib/aws-apigateway'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {DeploymentEnvironment} from '../types'
import CONFIG from '../config'

interface ApiGatewayProps {
  usersHandler: IFunction
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
  usersLambdaIntegration: LambdaIntegration
  authorizer: CognitoUserPoolsAuthorizer
}

export class Api extends Construct {
  public apiGateway: LambdaRestApi
  private readonly certificate: ICertificate
  private readonly deploymentEnvironment: DeploymentEnvironment
  private readonly authorizer: CognitoUserPoolsAuthorizer

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id)
    this.deploymentEnvironment = props.deploymentEnvironment
    this.certificate = props.certificate
    this.authorizer = props.authorizer
    this.apiGateway = this.createUsersApi(
      props.usersHandler,
      props.usersLambdaIntegration,
    )
  }

  private createUsersApi(
    usersHandler: IFunction,
    usersHandlerLambdaIntegration: LambdaIntegration,
  ): LambdaRestApi {
    const apiName = `Users Api (${this.deploymentEnvironment})`
    const api = new LambdaRestApi(this, apiName, {
      restApiName: apiName,
      handler: usersHandler,
      proxy: false,
      domainName: {
        domainName: CONFIG.API_URL,
        certificate: this.certificate,
      },
    })

    const users = api.root.addResource('users')
    users.addMethod('GET', usersHandlerLambdaIntegration, this.authorizer)
    users.addMethod('POST', usersHandlerLambdaIntegration, this.authorizer)

    const singleUser = api.root.addResource('{id}')
    singleUser.addMethod('GET', usersHandlerLambdaIntegration, this.authorizer)
    singleUser.addMethod('DELETE', usersHandlerLambdaIntegration, this.authorizer)
    singleUser.addMethod('PUT', usersHandlerLambdaIntegration, this.authorizer)
    this.authorizer._attachToApi(api)

    return api
  }
}
