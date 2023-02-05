import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration, LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

import {DeploymentEnvironment} from '../types'
import {createUsersApi} from './users'
import {createAuthApi} from './auth'

interface ApiGatewayProps {
  usersLambdaV1: IFunction
  usersLambdaIntegrationV1: LambdaIntegration
  authLambdaV1: IFunction
  authLambdaIntegrationV1: LambdaIntegration
  certificate: ICertificate
  userPool: UserPool
  deploymentEnvironment: DeploymentEnvironment
}

export class Api extends Construct {
  public usersApiGateway: LambdaRestApi
  public authApiGateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id)
    const {
      usersLambdaV1,
      usersLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
      userPool,
      certificate,
      deploymentEnvironment,
    } = props

    this.usersApiGateway = createUsersApi({
      scope: this,
      usersLambdaV1,
      usersLambdaIntegrationV1,
      deploymentEnvironment,
      certificate,
      userPool,
    })

    this.authApiGateway = createAuthApi({
      scope: this,
      authLambdaV1,
      authLambdaIntegrationV1,
      deploymentEnvironment,
      certificate,
      userPool,
    })
  }
}
