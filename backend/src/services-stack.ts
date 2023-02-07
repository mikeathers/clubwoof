import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from './types'
import {Databases} from './database'
import {Lambdas} from './lambdas'
import {Apis} from './api-gateway'
import {createApiCertificates, getHostedZone} from './aws'
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

    const certificates = createApiCertificates({
      scope: this,
      hostedZone,
      region: 'eu-west-2',
      certificates: [
        {
          name: `${CONFIG.STACK_PREFIX}AccountApiCertificate`,
          url: CONFIG.ACCOUNT_API_URL,
        },
      ],
    })

    const databases = new Databases(
      this,
      `${CONFIG.STACK_PREFIX}Databases`,
      deploymentEnvironment,
    )

    const {accountLambdaV1, accountLambdaIntegrationV1} = new Lambdas(
      this,
      `${CONFIG.STACK_PREFIX}Lambdas`,
      {
        usersTable: databases.accountsTable,
        eventsTable: databases.eventsTable,
        deploymentEnvironment,
      },
    )

    new Apis(this, `${CONFIG.STACK_PREFIX}ApiGateway`, {
      accountLambdaV1,
      accountLambdaIntegrationV1,
      deploymentEnvironment,
      userPool: props.userPool,
      certificates,
      hostedZone,
    })
  }
}
