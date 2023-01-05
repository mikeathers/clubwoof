import {join} from 'path'
import {
  AccountRecovery,
  BooleanAttribute,
  NumberAttribute,
  UserPool,
} from 'aws-cdk-lib/aws-cognito'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Runtime} from 'aws-cdk-lib/aws-lambda'

import {Construct} from 'constructs'
import {Duration, RemovalPolicy} from 'aws-cdk-lib'
import CONFIG from '../../config'

export class UserPoolConstruct {
  // @ts-ignore
  public userPool: UserPool
  private readonly scope: Construct
  // @ts-ignore
  private customMessagesTrigger: NodejsFunction
  // @ts-ignore
  private postConfirmationTrigger: NodejsFunction

  private readonly deploymentEnvironment: DeploymentEnvironment
  private readonly isProduction: boolean

  constructor(scope: Construct, deploymentEnvironment: DeploymentEnvironment) {
    this.scope = scope
    this.deploymentEnvironment = deploymentEnvironment
    this.isProduction = this.deploymentEnvironment === 'prod'
    this.createLambdas()
    this.createUserPool()
  }

  private createLambdas() {
    this.customMessagesTrigger = new NodejsFunction(this.scope, 'custom-messages', {
      runtime: Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(6),
      handler: 'main',
      entry: join(__dirname, '..', 'cognito-triggers', 'custom-messages', 'index.ts'),
      bundling: {externalModules: ['aws-sdk']},
      environment: {
        FRONTEND_BASE_URL: this.isProduction
          ? CONFIG.FRONTEND_BASE_URL_PROD
          : CONFIG.FRONTEND_BASE_URL_DEV,
      },
    })
    this.postConfirmationTrigger = new NodejsFunction(this.scope, 'post-confirmation', {
      runtime: Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(6),
      handler: 'main',
      entry: join(__dirname, '..', 'cognito-triggers', 'post-confirmation', 'index.ts'),
      bundling: {externalModules: ['aws-sdk']},
    })
  }

  private createUserPool() {
    this.userPool = new UserPool(this.scope, 'clubwoof-user-pool', {
      userPoolName: `${CONFIG.STACK_PREFIX}-${CONFIG.DEPLOY_ENVIRONMENT}`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        address: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        numberOfDogs: new NumberAttribute({mutable: true}),
        isAdmin: new BooleanAttribute({mutable: true}),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
      lambdaTriggers: {
        customMessage: this.customMessagesTrigger,
        postConfirmation: this.postConfirmationTrigger,
      },
    })
  }
}
