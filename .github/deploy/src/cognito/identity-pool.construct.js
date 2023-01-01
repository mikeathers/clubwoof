"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityPoolConstruct = void 0;
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const config_1 = require("../../config");
class IdentityPoolConstruct {
    constructor(scope, userPool, userPoolClient) {
        this.scope = scope;
        this.userPool = userPool;
        this.userPoolClient = userPoolClient;
        this.createIdentityPool();
        this.createAdminCognitoGroupRole();
        this.createAnonymousCognitoGroupRole();
        this.createUserCognitoGroupRole();
        this.createUserGroupsAndAttachRoles();
    }
    createIdentityPool() {
        this.identityPool = new aws_cognito_1.CfnIdentityPool(this.scope, 'clubwoof-identity-pool', {
            allowUnauthenticatedIdentities: true,
            identityPoolName: `${config_1.default.STACK_PREFIX}-${config_1.default.DEPLOY_ENVIRONMENT}`,
            cognitoIdentityProviders: [
                {
                    clientId: this.userPoolClient.userPoolClientId,
                    providerName: this.userPool.userPoolProviderName,
                },
            ],
        });
    }
    createUserCognitoGroupRole() {
        this.userRole = new aws_iam_1.Role(this.scope, 'user-group-role', {
            description: 'Default role for authenticated users',
            assumedBy: new aws_iam_1.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
            managedPolicies: [aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
        });
    }
    createAnonymousCognitoGroupRole() {
        this.anonymousRole = new aws_iam_1.Role(this.scope, 'anonymous-group-role', {
            description: 'Default role for anonymous users',
            assumedBy: new aws_iam_1.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
            managedPolicies: [aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
        });
    }
    createAdminCognitoGroupRole() {
        this.adminRole = new aws_iam_1.Role(this.scope, 'admins-group-role', {
            description: 'Default role for administrator users',
            assumedBy: new aws_iam_1.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
            managedPolicies: [aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
        });
    }
    createUserGroupsAndAttachRoles() {
        new aws_cognito_1.CfnUserPoolGroup(this.scope, 'users-group', {
            groupName: 'Users',
            userPoolId: this.userPool.userPoolId,
            description: 'The default group for authenticated users',
            precedence: 3,
            roleArn: this.userRole.roleArn,
        });
        new aws_cognito_1.CfnUserPoolGroup(this.scope, 'admins-group', {
            groupName: 'Admins',
            userPoolId: this.userPool.userPoolId,
            description: 'The group for admin users with specific privileges',
            precedence: 2,
            roleArn: this.adminRole.roleArn,
        });
        new aws_cognito_1.CfnIdentityPoolRoleAttachment(this.scope, 'identity-pool-role-attachment', {
            identityPoolId: this.identityPool.ref,
            roles: {
                authenticated: this.userRole.roleArn,
                unauthenticated: this.anonymousRole.roleArn,
            },
        });
    }
}
exports.IdentityPoolConstruct = IdentityPoolConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHktcG9vbC5jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZGVudGl0eS1wb29sLmNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFNZ0M7QUFDaEMsaURBQTZFO0FBQzdFLHlDQUFpQztBQUVqQyxNQUFhLHFCQUFxQjtJQWVoQyxZQUFZLEtBQWdCLEVBQUUsUUFBa0IsRUFBRSxjQUE4QjtRQUM5RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQTtJQUN2QyxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSw2QkFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7WUFDNUUsOEJBQThCLEVBQUUsSUFBSTtZQUNwQyxnQkFBZ0IsRUFBRSxHQUFHLGdCQUFNLENBQUMsWUFBWSxJQUFJLGdCQUFNLENBQUMsa0JBQWtCLEVBQUU7WUFDdkUsd0JBQXdCLEVBQUU7Z0JBQ3hCO29CQUNFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQjtvQkFDOUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CO2lCQUNqRDthQUNGO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxL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b20gJ2NvbnN0cnVjdHMnXG5pbXBvcnQge1xuICBDZm5JZGVudGl0eVBvb2wsXG4gIENmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50LFxuICBDZm5Vc2VyUG9vbEdyb3VwLFxuICBVc2VyUG9vbCxcbiAgVXNlclBvb2xDbGllbnQsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJ1xuaW1wb3J0IHsgRmVkZXJhdGVkUHJpbmNpcGFsLCBNYW5hZ2VkUG9saWN5LCBSb2xlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSdcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vY29uZmlnJ1xuXG5leHBvcnQgY2xhc3MgSWRlbnRpdHlQb29sQ29uc3RydWN0IHtcbiAgLy8gQHRzLWlnbm9yZVxuICBwdWJsaWMgaWRlbnRpdHlQb29sOiBDZm5JZGVudGl0eVBvb2xcbiAgcHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSByZWFkb25seSB1c2VyUG9vbDogVXNlclBvb2xcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIHJlYWRvbmx5IHVzZXJQb29sQ2xpZW50OiBVc2VyUG9vbENsaWVudFxuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgYWRtaW5Sb2xlOiBSb2xlXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBhbm9ueW1vdXNSb2xlOiBSb2xlXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSB1c2VyUm9sZTogUm9sZVxuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIHVzZXJQb29sOiBVc2VyUG9vbCwgdXNlclBvb2xDbGllbnQ6IFVzZXJQb29sQ2xpZW50KSB7XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlXG4gICAgdGhpcy51c2VyUG9vbCA9IHVzZXJQb29sXG4gICAgdGhpcy51c2VyUG9vbENsaWVudCA9IHVzZXJQb29sQ2xpZW50XG4gICAgdGhpcy5jcmVhdGVJZGVudGl0eVBvb2woKVxuICAgIHRoaXMuY3JlYXRlQWRtaW5Db2duaXRvR3JvdXBSb2xlKClcbiAgICB0aGlzLmNyZWF0ZUFub255bW91c0NvZ25pdG9Hcm91cFJvbGUoKVxuICAgIHRoaXMuY3JlYXRlVXNlckNvZ25pdG9Hcm91cFJvbGUoKVxuICAgIHRoaXMuY3JlYXRlVXNlckdyb3Vwc0FuZEF0dGFjaFJvbGVzKClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSWRlbnRpdHlQb29sKCkge1xuICAgIHRoaXMuaWRlbnRpdHlQb29sID0gbmV3IENmbklkZW50aXR5UG9vbCh0aGlzLnNjb3BlLCAnY2x1Yndvb2YtaWRlbnRpdHktcG9vbCcsIHtcbiAgICAgIGFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllczogdHJ1ZSxcbiAgICAgIGlkZW50aXR5UG9vbE5hbWU6IGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LSR7Q09ORklHLkRFUExPWV9FTlZJUk9OTUVOVH1gLFxuICAgICAgY29nbml0b0lkZW50aXR5UHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjbGllbnRJZDogdGhpcy51c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogdGhpcy51c2VyUG9vbC51c2VyUG9vbFByb3ZpZGVyTmFtZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVXNlckNvZ25pdG9Hcm91cFJvbGUoKSB7XG4gICAgdGhpcy51c2VyUm9sZSA9IG5ldyBSb2xlKHRoaXMuc2NvcGUsICd1c2VyLWdyb3VwLXJvbGUnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgcm9sZSBmb3IgYXV0aGVudGljYXRlZCB1c2VycycsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBGZWRlcmF0ZWRQcmluY2lwYWwoXG4gICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20nLFxuICAgICAgICB7XG4gICAgICAgICAgU3RyaW5nRXF1YWxzOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmF1ZCc6IHRoaXMuaWRlbnRpdHlQb29sLnJlZixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdGb3JBbnlWYWx1ZTpTdHJpbmdMaWtlJzoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphbXInOiAnYXV0aGVudGljYXRlZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0czpBc3N1bWVSb2xlV2l0aFdlYklkZW50aXR5JyxcbiAgICAgICksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnc2VydmljZS1yb2xlL0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScpXSxcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBbm9ueW1vdXNDb2duaXRvR3JvdXBSb2xlKCkge1xuICAgIHRoaXMuYW5vbnltb3VzUm9sZSA9IG5ldyBSb2xlKHRoaXMuc2NvcGUsICdhbm9ueW1vdXMtZ3JvdXAtcm9sZScsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCByb2xlIGZvciBhbm9ueW1vdXMgdXNlcnMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgRmVkZXJhdGVkUHJpbmNpcGFsKFxuICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiB0aGlzLmlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eScsXG4gICAgICApLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKV0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQWRtaW5Db2duaXRvR3JvdXBSb2xlKCkge1xuICAgIHRoaXMuYWRtaW5Sb2xlID0gbmV3IFJvbGUodGhpcy5zY29wZSwgJ2FkbWlucy1ncm91cC1yb2xlJywge1xuICAgICAgZGVzY3JpcHRpb246ICdEZWZhdWx0IHJvbGUgZm9yIGFkbWluaXN0cmF0b3IgdXNlcnMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgRmVkZXJhdGVkUHJpbmNpcGFsKFxuICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiB0aGlzLmlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eScsXG4gICAgICApLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKV0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVXNlckdyb3Vwc0FuZEF0dGFjaFJvbGVzKCkge1xuICAgIG5ldyBDZm5Vc2VyUG9vbEdyb3VwKHRoaXMuc2NvcGUsICd1c2Vycy1ncm91cCcsIHtcbiAgICAgIGdyb3VwTmFtZTogJ1VzZXJzJyxcbiAgICAgIHVzZXJQb29sSWQ6IHRoaXMudXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGRlZmF1bHQgZ3JvdXAgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlcnMnLFxuICAgICAgcHJlY2VkZW5jZTogMyxcbiAgICAgIHJvbGVBcm46IHRoaXMudXNlclJvbGUucm9sZUFybixcbiAgICB9KVxuXG4gICAgbmV3IENmblVzZXJQb29sR3JvdXAodGhpcy5zY29wZSwgJ2FkbWlucy1ncm91cCcsIHtcbiAgICAgIGdyb3VwTmFtZTogJ0FkbWlucycsXG4gICAgICB1c2VyUG9vbElkOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBncm91cCBmb3IgYWRtaW4gdXNlcnMgd2l0aCBzcGVjaWZpYyBwcml2aWxlZ2VzJyxcbiAgICAgIHByZWNlZGVuY2U6IDIsXG4gICAgICByb2xlQXJuOiB0aGlzLmFkbWluUm9sZS5yb2xlQXJuLFxuICAgIH0pXG5cbiAgICBuZXcgQ2ZuSWRlbnRpdHlQb29sUm9sZUF0dGFjaG1lbnQodGhpcy5zY29wZSwgJ2lkZW50aXR5LXBvb2wtcm9sZS1hdHRhY2htZW50Jywge1xuICAgICAgaWRlbnRpdHlQb29sSWQ6IHRoaXMuaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIHJvbGVzOiB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHRoaXMudXNlclJvbGUucm9sZUFybixcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB0aGlzLmFub255bW91c1JvbGUucm9sZUFybixcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19