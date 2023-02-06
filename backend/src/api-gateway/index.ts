import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration, LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'

import {DeploymentEnvironment} from '../types'
import {createAccountApi} from './account'
import {CreatedCertificates} from '../aws'

interface ApisProps {
  accountLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  userPool: UserPool
  deploymentEnvironment: DeploymentEnvironment
  certificates: CreatedCertificates
  hostedZone: IHostedZone
}

export class Apis extends Construct {
  public accountApiGateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApisProps) {
    super(scope, id)
    const {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      userPool,
      deploymentEnvironment,
      certificates,
      hostedZone,
    } = props

    const {accountCertificate} = certificates

    this.accountApiGateway = createAccountApi({
      scope: this,
      accountLambdaV1,
      accountLambdaIntegrationV1,
      deploymentEnvironment,
      userPool,
      certificate: accountCertificate,
      hostedZone,
    })
  }
}
