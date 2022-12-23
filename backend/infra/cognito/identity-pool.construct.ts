import { Construct } from 'constructs'
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito'
import { FederatedPrincipal, ManagedPolicy, Role } from 'aws-cdk-lib/aws-iam'
import CONFIG from '../../config'

export class IdentityPoolConstruct {
  // @ts-ignore
  public identityPool: CfnIdentityPool
  private readonly scope: Construct
  // @ts-ignore
  private readonly userPool: UserPool
  // @ts-ignore
  private readonly userPoolClient: UserPoolClient
  // @ts-ignore
  private adminRole: Role
  // @ts-ignore
  private anonymousRole: Role
  // @ts-ignore
  private userRole: Role

  constructor(scope: Construct, userPool: UserPool, userPoolClient: UserPoolClient) {
    this.scope = scope
    this.userPool = userPool
    this.userPoolClient = userPoolClient
    this.createIdentityPool()
    this.createAdminCognitoGroupRole()
    this.createAnonymousCognitoGroupRole()
    this.createUserCognitoGroupRole()
    this.createUserGroupsAndAttachRoles()
  }

  private createIdentityPool() {
    this.identityPool = new CfnIdentityPool(this.scope, 'clubwoof-identity-pool', {
      allowUnauthenticatedIdentities: true,
      identityPoolName: `${CONFIG.STACK_PREFIX}-${CONFIG.DEPLOY_ENVIRONMENT}`,
      cognitoIdentityProviders: [
        {
          clientId: this.userPoolClient.userPoolClientId,
          providerName: this.userPool.userPoolProviderName,
        },
      ],
    })
  }

  private createUserCognitoGroupRole() {
    this.userRole = new Role(this.scope, 'user-group-role', {
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
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
    })
  }

  private createAnonymousCognitoGroupRole() {
    this.anonymousRole = new Role(this.scope, 'anonymous-group-role', {
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
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
    })
  }

  private createAdminCognitoGroupRole() {
    this.adminRole = new Role(this.scope, 'admins-group-role', {
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
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
    })
  }

  private createUserGroupsAndAttachRoles() {
    new CfnUserPoolGroup(this.scope, 'users-group', {
      groupName: 'Users',
      userPoolId: this.userPool.userPoolId,
      description: 'The default group for authenticated users',
      precedence: 3,
      roleArn: this.userRole.roleArn,
    })

    new CfnUserPoolGroup(this.scope, 'admins-group', {
      groupName: 'Admins',
      userPoolId: this.userPool.userPoolId,
      description: 'The group for admin users with specific privileges',
      precedence: 2,
      roleArn: this.adminRole.roleArn,
    })

    new CfnIdentityPoolRoleAttachment(this.scope, 'identity-pool-role-attachment', {
      identityPoolId: this.identityPool.ref,
      roles: {
        authenticated: this.userRole.roleArn,
        unauthenticated: this.anonymousRole.roleArn,
      },
    })
  }
}
