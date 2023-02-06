import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import {Auth} from '@aws-amplify/auth'

import {DeploymentEnvironment} from './types'
import {Database} from './database'
import {Lambdas} from './lambdas'
import {Apis} from './api-gateway'
import {createApiCertificates, getHostedZone} from './aws'
import CONFIG, {DEV_CONFIG, PROD_CONFIG} from './config'

interface ServicesStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
  userPool: UserPool
}

export class ServicesStack extends Stack {
  constructor(scope: Construct, id: string, props: ServicesStackProps) {
    super(scope, id, props)
    const {deploymentEnvironment} = props
    const isProd = deploymentEnvironment === 'Prod'

    Auth.configure({
      mandatorySignIn: false,
      region: CONFIG.REGION,
      userPoolId: isProd ? PROD_CONFIG.USER_POOL_ID : DEV_CONFIG.USER_POOL_ID,
      identityPoolId: isProd ? PROD_CONFIG.IDENTITY_POOL_ID : DEV_CONFIG.IDENTITY_POOL_ID,
      userPoolWebClientId: isProd
        ? PROD_CONFIG.USER_POOL_WEB_CLIENT_ID
        : DEV_CONFIG.USER_POOL_WEB_CLIENT_ID,
    })

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificates = createApiCertificates({
      scope: this,
      hostedZone,
      region: 'eu-west-2',
      certificates: [
        {name: 'AccountApiCertificate', url: CONFIG.ACCOUNT_API_URL},
        {name: 'AuthApiCertificate', url: CONFIG.AUTH_API_URL},
      ],
    })

    const databases = new Database(this, 'Databases', deploymentEnvironment)

    const {
      usersLambdaV1,
      usersLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
    } = new Lambdas(this, 'Lambdas', {
      usersTable: databases.accountsTable,
      eventsTable: databases.eventsTable,
      deploymentEnvironment,
    })

    new Apis(this, 'ApiGateway', {
      accountLambdaV1: usersLambdaV1,
      accountLambdaIntegrationV1: usersLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
      deploymentEnvironment,
      userPool: props.userPool,
      certificates,
      hostedZone,
    })
  }
}
