import {ARecord, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {ApiGateway} from 'aws-cdk-lib/aws-route53-targets'
import {UserPool} from 'aws-cdk-lib/aws-cognito'
import {Stack, StackProps} from 'aws-cdk-lib'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from './types'
import {Database} from './database'
import {Lambdas} from './lambdas'
import {Api} from './api-gateway'
import {createCertificate, getHostedZone} from './aws'
import CONFIG, {DEV_CONFIG, PROD_CONFIG} from './config'
import {Auth} from '@aws-amplify/auth'

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
      region: isProd ? PROD_CONFIG.REGION : DEV_CONFIG.REGION,
      userPoolId: isProd ? PROD_CONFIG.USER_POOL_ID : DEV_CONFIG.USER_POOL_ID,
      identityPoolId: isProd ? PROD_CONFIG.IDENTITY_POOL_ID : DEV_CONFIG.IDENTITY_POOL_ID,
      userPoolWebClientId: isProd
        ? PROD_CONFIG.USER_POOL_WEB_CLIENT_ID
        : DEV_CONFIG.USER_POOL_WEB_CLIENT_ID,
    })

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificate = createCertificate({
      scope: this,
      url: CONFIG.API_URL,
      hostedZone,
      name: 'WebsiteCertificate',
      region: 'eu-west-2',
    })

    const databases = new Database(this, 'Databases', deploymentEnvironment)

    const {
      usersLambdaV1,
      usersLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
    } = new Lambdas(this, 'Lambdas', {
      usersTable: databases.usersTable,
      eventsTable: databases.eventsTable,
      deploymentEnvironment,
    })

    const api = new Api(this, 'ApiGateway', {
      usersLambdaV1,
      usersLambdaIntegrationV1,
      authLambdaV1,
      authLambdaIntegrationV1,
      certificate,
      deploymentEnvironment,
      userPool: props.userPool,
    })

    new ARecord(this, 'ApiGatewayAliasRecord', {
      recordName: CONFIG.API_URL,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new ApiGateway(api.usersApiGateway)),
    })
  }
}
