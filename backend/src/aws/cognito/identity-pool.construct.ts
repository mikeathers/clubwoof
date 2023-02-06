import {Construct} from 'constructs'
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito'
import {FederatedPrincipal, ManagedPolicy, Role} from 'aws-cdk-lib/aws-iam'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

export class IdentityPoolConstruct {
  public identityPool: CfnIdentityPool
  private readonly scope: Construct
  private readonly userPool: UserPool
  private readonly userPoolClient: UserPoolClient
  private adminRole: Role
  private anonymousRole: Role
  private userRole: Role
  private readonly deploymentEnvironment: DeploymentEnvironment

  constructor(
    scope: Construct,
    userPool: UserPool,
    userPoolClient: UserPoolClient,
    deploymentEnvironment: DeploymentEnvironment,
  ) {
    this.scope = scope
    this.userPool = userPool
    this.userPoolClient = userPoolClient
    this.deploymentEnvironment = deploymentEnvironment

    this.identityPool = this.createIdentityPool()
    this.adminRole = this.createAdminCognitoGroupRole()
    this.anonymousRole = this.createAnonymousCognitoGroupRole()
    this.userRole = this.createUserCognitoGroupRole()
    this.createUserGroupsAndAttachRoles()
  }

  private createIdentityPool() {
    return new CfnIdentityPool(this.scope, `${CONFIG.STACK_PREFIX}IdentityPool`, {
      allowUnauthenticatedIdentities: true,
      identityPoolName: `${CONFIG.STACK_PREFIX}${this.deploymentEnvironment}`,
      cognitoIdentityProviders: [
        {
          clientId: this.userPoolClient.userPoolClientId,
          providerName: this.userPool.userPoolProviderName,
        },
      ],
    })
  }

  private createUserCognitoGroupRole() {
    return new Role(this.scope, 'UserGroupRole', {
      roleName: 'UserGroupRole',
      description: 'Default role for authenticated users',
      assumedBy: new FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayInvokeFullAccess'),
      ],
    })
  }

  private createAnonymousCognitoGroupRole() {
    return new Role(this.scope, 'AnonymousGroupRole', {
      roleName: 'AnonymousGroupRole',
      description: 'Default role for anonymous users',
      assumedBy: new FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayInvokeFullAccess'),
      ],
    })
  }

  private createAdminCognitoGroupRole() {
    return new Role(this.scope, 'AdminsGroupRole', {
      roleName: 'AdminsGroupRole',
      description: 'Default role for administrator users',
      assumedBy: new FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity',
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayInvokeFullAccess'),
      ],
    })
  }

  private createUserGroupsAndAttachRoles() {
    new CfnUserPoolGroup(this.scope, 'UsersGroup', {
      groupName: 'Users',
      userPoolId: this.userPool.userPoolId,
      description: 'The default group for authenticated users',
      precedence: 3,
      roleArn: this.userRole.roleArn,
    })

    new CfnUserPoolGroup(this.scope, 'AdminsGroup', {
      groupName: 'Admins',
      userPoolId: this.userPool.userPoolId,
      description: 'The group for admin users with specific privileges',
      precedence: 2,
      roleArn: this.adminRole.roleArn,
    })

    new CfnIdentityPoolRoleAttachment(this.scope, 'IdentityPoolRoleAttachment', {
      identityPoolId: this.identityPool.ref,
      roles: {
        authenticated: this.userRole.roleArn,
        unauthenticated: this.anonymousRole.roleArn,
      },
    })
  }
}
