import {ARecord, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from './types'
import {Database} from './database'
import {Handlers} from './handlers'
import {Api} from './api-gateway'
import {createCertificate, getHostedZone} from './aws'
import CONFIG from './config'

interface ServicesStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export class ServicesStack extends Stack {
  constructor(scope: Construct, id: string, props: ServicesStackProps) {
    super(scope, id, props)
    const {deploymentEnvironment} = props

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificate = createCertificate({
      scope: this,
      url: CONFIG.API_URL,
      hostedZone,
      name: 'WebsiteCertificate',
      region: 'eu-west-2',
    })

    const databases = new Database(this, 'Databases', deploymentEnvironment)

    const {usersHandler, usersLambdaIntegration} = new Handlers(this, 'Handlers', {
      usersTable: databases.usersTable,
      eventsTable: databases.eventsTable,
      deploymentEnvironment,
    })

    const api = new Api(this, 'ApiGateway', {
      usersHandler,
      certificate,
      deploymentEnvironment,
      usersLambdaIntegration,
      userPool: props.userPool,
    })

    new ARecord(this, 'ApiGatewayAliasRecord', {
      recordName: CONFIG.API_URL,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new ApiGateway(api.apiGateway)),
    })
  }
}
