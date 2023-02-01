import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {DeploymentEnvironment} from '../types'
import CONFIG from '../config'

interface ApiGatewayProps {
  usersHandler: IFunction
  certificate: ICertificate
  deploymentEnvironment: DeploymentEnvironment
}
export class Api extends Construct {
  private readonly certificate: ICertificate
  private readonly deploymentEnvironment: DeploymentEnvironment
  public apiGateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id)
    this.deploymentEnvironment = props.deploymentEnvironment
    this.certificate = props.certificate
    this.apiGateway = this.createUsersApi(props.usersHandler)
  }

  private createUsersApi(usersHandler: IFunction): LambdaRestApi {
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
    users.addMethod('GET')
    users.addMethod('POST')

    const singleUser = api.root.addResource('{id}')
    singleUser.addMethod('GET')
    singleUser.addMethod('DELETE')
    singleUser.addMethod('PUT')
    return api
  }
}
