import {Construct} from 'constructs'
import {
  ClientAttributes,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from 'aws-cdk-lib/aws-cognito'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

export class UserPoolClientConstruct {
  public userPoolClient: UserPoolClient
  private readonly scope: Construct
  private readonly userPool: UserPool
  private readonly deploymentEnvironment: DeploymentEnvironment

  constructor(
    scope: Construct,
    userPool: UserPool,
    deploymentEnvironment: DeploymentEnvironment,
  ) {
    this.scope = scope
    this.userPool = userPool
    this.deploymentEnvironment = deploymentEnvironment
    this.userPoolClient = this.createUserPoolClient()
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

    return new UserPoolClient(this.scope, `${CONFIG.STACK_PREFIX}UserPoolClient`, {
      userPoolClientName: `${CONFIG.STACK_PREFIX}${this.deploymentEnvironment}`,
      userPool: this.userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
        userPassword: true,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    })
  }
}
