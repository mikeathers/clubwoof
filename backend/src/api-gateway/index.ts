import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration, LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

import {DeploymentEnvironment} from '../types'
import {createUsersApi} from './users'

interface ApiGatewayProps {
  usersLambdaV1: IFunction
  usersLambdaIntegrationV1: LambdaIntegration
  certificate: ICertificate
  userPool: UserPool
  deploymentEnvironment: DeploymentEnvironment
}

export class Api extends Construct {
  public apiGateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id)
    const {
      usersLambdaV1,
      usersLambdaIntegrationV1,
      userPool,
      certificate,
      deploymentEnvironment,
    } = props

    this.apiGateway = createUsersApi({
      scope: this,
      usersLambdaV1,
      usersLambdaIntegrationV1,
      userPool,
      deploymentEnvironment,
      certificate,
    })
  }
}
