import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration, LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

import {DeploymentEnvironment} from '../types'
import {createAccountApi} from './account'
import {createAuthApi} from './auth'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'
import {CreatedCertificates} from '../aws'

interface ApisProps {
  accountLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  authLambdaV1: IFunction
  authLambdaIntegrationV1: LambdaIntegration
  userPool: UserPool
  deploymentEnvironment: DeploymentEnvironment
  certificates: CreatedCertificates
  hostedZone: IHostedZone
}

export class Apis extends Construct {
  public accountApiGateway: LambdaRestApi
  public authApiGateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApisProps) {
    super(scope, id)
    const {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
      userPool,
      deploymentEnvironment,
      certificates,
      hostedZone,
    } = props

    const {authCertificate, accountCertificate} = certificates

    this.accountApiGateway = createAccountApi({
      scope: this,
      accountLambdaV1,
      accountLambdaIntegrationV1,
      deploymentEnvironment,
      userPool,
      certificate: accountCertificate,
      hostedZone,
    })

    this.authApiGateway = createAuthApi({
      scope: this,
      authLambdaV1,
      authLambdaIntegrationV1,
      deploymentEnvironment,
      userPool,
      certificate: authCertificate,
      hostedZone,
    })
  }
}
