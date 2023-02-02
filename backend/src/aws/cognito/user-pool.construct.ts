import {join} from 'path'
import {
  AccountRecovery,
  BooleanAttribute,
  CfnUserPool,
  NumberAttribute,
  UserPool,
} from 'aws-cdk-lib/aws-cognito'
import {Policy, PolicyStatement} from 'aws-cdk-lib/aws-iam'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Runtime} from 'aws-cdk-lib/aws-lambda'
import {Construct} from 'constructs'
import {Duration, RemovalPolicy, Stack} from 'aws-cdk-lib'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

export class UserPoolConstruct {
  public userPool: UserPool
  private readonly scope: Construct
  private readonly customMessagesTrigger: NodejsFunction
  private readonly postConfirmationTrigger: NodejsFunction
  private certificate: ICertificate
  private readonly deploymentEnvironment: DeploymentEnvironment
  private readonly isProduction: boolean

  constructor(
    scope: Construct,
    deploymentEnvironment: DeploymentEnvironment,
    certificate: ICertificate,
  ) {
    this.scope = scope
    this.deploymentEnvironment = deploymentEnvironment
    this.isProduction = this.deploymentEnvironment === 'prod'
    this.certificate = certificate
    this.postConfirmationTrigger = this.createPostConfirmationTrigger()
    this.customMessagesTrigger = this.createCustomMessagesTrigger()
    this.userPool = this.createUserPool()
    this.createPolicyAndAssignToRole()
    this.addSES()
  }

  private createPostConfirmationTrigger() {
    return new NodejsFunction(this.scope, 'post-confirmation', {
      runtime: Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(6),
      handler: 'main',
      entry: join(__dirname, './triggers/post-confirmation/index.ts'),
      bundling: {externalModules: ['aws-sdk']},
    })
  }

  private createCustomMessagesTrigger() {
    return new NodejsFunction(this.scope, 'custom-messages', {
      runtime: Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(6),
      handler: 'main',
      entry: join(__dirname, './triggers/custom-messages/index.ts'),
      bundling: {externalModules: ['aws-sdk']},
      environment: {
        FRONTEND_BASE_URL: this.isProduction
          ? CONFIG.FRONTEND_BASE_URL_PROD
          : CONFIG.FRONTEND_BASE_URL_DEV,
      },
    })
  }

  private createPolicyAndAssignToRole() {
    const adminAddUserToGroupPolicyStatement = new PolicyStatement({
      actions: ['cognito-idp:AdminAddUserToGroup'],
      resources: [this.userPool.userPoolArn],
    })

    this.postConfirmationTrigger.role?.attachInlinePolicy(
      new Policy(this.scope, 'post-confirm-trigger-policy', {
        statements: [adminAddUserToGroupPolicyStatement],
      }),
    )
  }

  private addSES() {
    const cfnUserPool = this.userPool.node.defaultChild as CfnUserPool
    cfnUserPool.emailConfiguration = {
      emailSendingAccount: 'DEVELOPER',
      from: 'Clubwoof <noreply@clubwoof.co.uk>',
      sourceArn: `arn:aws:ses:eu-west-2:${
        Stack.of(this.scope).account
      }:identity/clubwoof.co.uk`,
    }
  }

  private createUserPool() {
    return new UserPool(this.scope, 'clubwoof-user-pool', {
      userPoolName: `${CONFIG.STACK_PREFIX}-${this.deploymentEnvironment}`,
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
