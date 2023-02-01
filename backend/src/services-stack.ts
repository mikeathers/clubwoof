import {Stack, StackProps} from 'aws-cdk-lib'
import {DeploymentEnvironment} from './types'
import {Construct} from 'constructs'
import {Database} from './database'
import {Handlers} from './handlers'
import {Api} from './api-gateway'
import {createCertificate, getHostedZone} from './aws'
import CONFIG from './config'
import {ARecord, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'

interface ServicesStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
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

    const handlers = new Handlers(this, 'Handlers', {
      usersTable: databases.usersTable,
      eventsTable: databases.eventsTable,
      deploymentEnvironment,
    })

    const api = new Api(this, 'ApiGateway', {
      usersHandler: handlers.usersHandler,
      certificate,
      deploymentEnvironment,
    })

    new ARecord(this, 'AliasRecord', {
      recordName: CONFIG.API_URL,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new ApiGateway(api.apiGateway)),
    })
  }
}