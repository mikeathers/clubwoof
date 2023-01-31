import {Stack, StackProps} from 'aws-cdk-lib'
import {DeploymentEnvironment} from './types'
import {Construct} from 'constructs'
import {Database} from './database'
import {Handlers} from './handlers'
import {ApiGateway} from './api-gateway'
import {createCertificate, getHostedZone} from './aws'
import CONFIG from './config'

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
      url: CONFIG.DOMAIN_NAME,
      hostedZone,
      name: 'WebsiteCertificate',
    })

    const databases = new Database(this, 'Databases', deploymentEnvironment)

    const handlers = new Handlers(this, 'Handlers', {
      usersTable: databases.usersTable,
      eventsTable: databases.eventsTable,
      deploymentEnvironment,
    })

    const apiGateway = new ApiGateway(this, 'ApiGateway', {
      usersHandler: handlers.usersHandler,
      certificate,
      deploymentEnvironment,
    })
  }
}
