import {Construct} from 'constructs'
import {IFunction} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration, LambdaRestApi} from 'aws-cdk-lib/aws-apigateway'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'

import {DeploymentEnvironment} from '../types'
import {AccountApi} from './account'
import {CreatedCertificates} from '../aws'
import {EventsApi} from './events'

interface ApisProps {
  accountLambdaV1: IFunction
  accountLambdaIntegrationV1: LambdaIntegration
  eventsLambdaV1: IFunction
  eventsLambdaIntegrationV1: LambdaIntegration
  stage: DeploymentEnvironment
  certificates: CreatedCertificates
  hostedZone: IHostedZone
}

export class Apis extends Construct {
  public accountApi: LambdaRestApi
  public eventsApi: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApisProps) {
    super(scope, id)
    const {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      eventsLambdaIntegrationV1,
      eventsLambdaV1,
      stage,
      certificates,
      hostedZone,
    } = props

    const {accountCertificate, eventsCertificate} = certificates

    const {accountApi} = new AccountApi({
      scope: this,
      accountLambdaV1,
      accountLambdaIntegrationV1,
      stage,
      certificate: accountCertificate,
      hostedZone,
    })
    this.accountApi = accountApi

    const {eventsApi} = new EventsApi({
      scope: this,
      eventsLambdaV1,
      eventsLambdaIntegrationV1,
      stage,
      certificate: eventsCertificate,
      hostedZone,
    })
    this.eventsApi = eventsApi
  }
}
