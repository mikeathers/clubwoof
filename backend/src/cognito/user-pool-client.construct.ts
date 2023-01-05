import {Construct} from 'constructs'
import {
  ClientAttributes,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from 'aws-cdk-lib/aws-cognito'
import CONFIG from '../../config'

export class UserPoolClientConstruct {
  // @ts-ignore
  public userPoolClient: UserPoolClient
  private readonly scope: Construct
  private readonly userPool: UserPool

  constructor(scope: Construct, userPool: UserPool) {
    this.scope = scope
    this.userPool = userPool
    this.createUserPoolClient()
  }

  private createUserPoolClient() {
    const standardCognitoAttributes = {
      givenName: true,
      familyName: true,
      email: true,
      emailVerified: true,
      address: true,
      birthdate: true,
      gender: true,
      middleName: true,
      fullname: true,
      nickname: true,
      phoneNumber: true,
      phoneNumberVerified: true,
      profilePicture: true,
      preferredUsername: true,
      profilePage: true,
      lastUpdateTime: true,
    }

    const clientReadAttributes = new ClientAttributes()
      .withStandardAttributes(standardCognitoAttributes)
      .withCustomAttributes(...['numberOfDogs', 'isAdmin'])

    const clientWriteAttributes = new ClientAttributes()
      .withStandardAttributes({
        ...standardCognitoAttributes,
        emailVerified: false,
        phoneNumberVerified: false,
      })
      .withCustomAttributes(...['numberOfDogs'])

    this.userPoolClient = new UserPoolClient(this.scope, 'clubwoof-user-pool-client', {
      userPoolClientName: `${CONFIG.STACK_PREFIX}-${CONFIG.DEPLOY_ENVIRONMENT}`,
      userPool: this.userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    })
  }
}
