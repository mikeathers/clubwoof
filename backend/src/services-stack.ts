import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from './types'
import {Databases} from './database'
import {Lambdas} from './lambdas'
import {Apis} from './api-gateway'
import {createApiCertificates, getHostedZone} from './aws'
import CONFIG from './config'
import {EventBus, EventQueue} from './event-bus'

interface ServicesStackProps extends StackProps {
  stage: DeploymentEnvironment
  userPool: UserPool
}

export class ServicesStack extends Stack {
  constructor(scope: Construct, id: string, props: ServicesStackProps) {
    super(scope, id, props)
    const {stage, userPool} = props

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificates = createApiCertificates({
      scope: this,
      hostedZone,
      region: 'eu-west-2',
      certificates: [
        {
          name: `${CONFIG.STACK_PREFIX}AccountApiCertificate`,
          url: CONFIG.ACCOUNT_API_URL,
        },
        {
          name: `${CONFIG.STACK_PREFIX}EventApiCertificate`,
          url: CONFIG.EVENTS_API_URL,
        },
      ],
    })

    const databases = new Databases(this, `${CONFIG.STACK_PREFIX}Databases`, stage)

    const {eventBus, eventRule} = new EventBus(this, `${CONFIG.STACK_PREFIX}EventBus`, {
      stage,
      account: this.account,
    })

    const {eventQueue, deadLetterQueue} = new EventQueue(
      this,
      `${CONFIG.STACK_PREFIX}EventQueue`,
      {
        stage,
      },
    )

    const {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      eventsLambdaIntegrationV1,
      eventsLambdaV1,
    } = new Lambdas(this, `${CONFIG.STACK_PREFIX}Lambdas`, {
      accountsTable: databases.accountsTable,
      eventsTable: databases.eventsTable,
      stage,
      eventBusArn: eventBus.eventBusArn,
      eventBusName: eventBus.eventBusName,
      accountRule: eventRule,
      eventQueue,
      deadLetterQueue,
    })

    new Apis(this, `${CONFIG.STACK_PREFIX}ApiGateway`, {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      eventsLambdaV1,
      eventsLambdaIntegrationV1,
      stage,
      userPool,
      certificates,
      hostedZone,
    })
  }
}
