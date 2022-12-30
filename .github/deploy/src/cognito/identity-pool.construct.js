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
        console.log('hey');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHktcG9vbC5jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZGVudGl0eS1wb29sLmNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFNZ0M7QUFDaEMsaURBQTJFO0FBQzNFLHlDQUFpQztBQUVqQyxNQUFhLHFCQUFxQjtJQWVoQyxZQUFZLEtBQWdCLEVBQUUsUUFBa0IsRUFBRSxjQUE4QjtRQUM5RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQTtRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLDZCQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtZQUM1RSw4QkFBOEIsRUFBRSxJQUFJO1lBQ3BDLGdCQUFnQixFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLElBQUksZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRTtZQUN2RSx3QkFBd0IsRUFBRTtnQkFDeEI7b0JBQ0UsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO29CQUM5QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0I7aUJBQ2pEO2FBQ0Y7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUks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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3R9IGZyb20gJ2NvbnN0cnVjdHMnXG5pbXBvcnQge1xuICBDZm5JZGVudGl0eVBvb2wsXG4gIENmbklkZW50aXR5UG9vbFJvbGVBdHRhY2htZW50LFxuICBDZm5Vc2VyUG9vbEdyb3VwLFxuICBVc2VyUG9vbCxcbiAgVXNlclBvb2xDbGllbnQsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJ1xuaW1wb3J0IHtGZWRlcmF0ZWRQcmluY2lwYWwsIE1hbmFnZWRQb2xpY3ksIFJvbGV9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uL2NvbmZpZydcblxuZXhwb3J0IGNsYXNzIElkZW50aXR5UG9vbENvbnN0cnVjdCB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHVibGljIGlkZW50aXR5UG9vbDogQ2ZuSWRlbnRpdHlQb29sXG4gIHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IENvbnN0cnVjdFxuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgcmVhZG9ubHkgdXNlclBvb2w6IFVzZXJQb29sXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSByZWFkb25seSB1c2VyUG9vbENsaWVudDogVXNlclBvb2xDbGllbnRcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIGFkbWluUm9sZTogUm9sZVxuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgYW5vbnltb3VzUm9sZTogUm9sZVxuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgdXNlclJvbGU6IFJvbGVcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCB1c2VyUG9vbDogVXNlclBvb2wsIHVzZXJQb29sQ2xpZW50OiBVc2VyUG9vbENsaWVudCkge1xuICAgIHRoaXMuc2NvcGUgPSBzY29wZVxuICAgIHRoaXMudXNlclBvb2wgPSB1c2VyUG9vbFxuICAgIHRoaXMudXNlclBvb2xDbGllbnQgPSB1c2VyUG9vbENsaWVudFxuICAgIHRoaXMuY3JlYXRlSWRlbnRpdHlQb29sKClcbiAgICB0aGlzLmNyZWF0ZUFkbWluQ29nbml0b0dyb3VwUm9sZSgpXG4gICAgdGhpcy5jcmVhdGVBbm9ueW1vdXNDb2duaXRvR3JvdXBSb2xlKClcbiAgICB0aGlzLmNyZWF0ZVVzZXJDb2duaXRvR3JvdXBSb2xlKClcbiAgICB0aGlzLmNyZWF0ZVVzZXJHcm91cHNBbmRBdHRhY2hSb2xlcygpXG5cbiAgICBjb25zb2xlLmxvZygnaGV5JylcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSWRlbnRpdHlQb29sKCkge1xuICAgIHRoaXMuaWRlbnRpdHlQb29sID0gbmV3IENmbklkZW50aXR5UG9vbCh0aGlzLnNjb3BlLCAnY2x1Yndvb2YtaWRlbnRpdHktcG9vbCcsIHtcbiAgICAgIGFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllczogdHJ1ZSxcbiAgICAgIGlkZW50aXR5UG9vbE5hbWU6IGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LSR7Q09ORklHLkRFUExPWV9FTlZJUk9OTUVOVH1gLFxuICAgICAgY29nbml0b0lkZW50aXR5UHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjbGllbnRJZDogdGhpcy51c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogdGhpcy51c2VyUG9vbC51c2VyUG9vbFByb3ZpZGVyTmFtZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVXNlckNvZ25pdG9Hcm91cFJvbGUoKSB7XG4gICAgdGhpcy51c2VyUm9sZSA9IG5ldyBSb2xlKHRoaXMuc2NvcGUsICd1c2VyLWdyb3VwLXJvbGUnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgcm9sZSBmb3IgYXV0aGVudGljYXRlZCB1c2VycycsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBGZWRlcmF0ZWRQcmluY2lwYWwoXG4gICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20nLFxuICAgICAgICB7XG4gICAgICAgICAgU3RyaW5nRXF1YWxzOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmF1ZCc6IHRoaXMuaWRlbnRpdHlQb29sLnJlZixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdGb3JBbnlWYWx1ZTpTdHJpbmdMaWtlJzoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphbXInOiAnYXV0aGVudGljYXRlZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0czpBc3N1bWVSb2xlV2l0aFdlYklkZW50aXR5JyxcbiAgICAgICksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnc2VydmljZS1yb2xlL0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScpXSxcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBbm9ueW1vdXNDb2duaXRvR3JvdXBSb2xlKCkge1xuICAgIHRoaXMuYW5vbnltb3VzUm9sZSA9IG5ldyBSb2xlKHRoaXMuc2NvcGUsICdhbm9ueW1vdXMtZ3JvdXAtcm9sZScsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCByb2xlIGZvciBhbm9ueW1vdXMgdXNlcnMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgRmVkZXJhdGVkUHJpbmNpcGFsKFxuICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiB0aGlzLmlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eScsXG4gICAgICApLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKV0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQWRtaW5Db2duaXRvR3JvdXBSb2xlKCkge1xuICAgIHRoaXMuYWRtaW5Sb2xlID0gbmV3IFJvbGUodGhpcy5zY29wZSwgJ2FkbWlucy1ncm91cC1yb2xlJywge1xuICAgICAgZGVzY3JpcHRpb246ICdEZWZhdWx0IHJvbGUgZm9yIGFkbWluaXN0cmF0b3IgdXNlcnMnLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgRmVkZXJhdGVkUHJpbmNpcGFsKFxuICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAge1xuICAgICAgICAgIFN0cmluZ0VxdWFsczoge1xuICAgICAgICAgICAgJ2NvZ25pdG8taWRlbnRpdHkuYW1hem9uYXdzLmNvbTphdWQnOiB0aGlzLmlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eScsXG4gICAgICApLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnKV0sXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVXNlckdyb3Vwc0FuZEF0dGFjaFJvbGVzKCkge1xuICAgIG5ldyBDZm5Vc2VyUG9vbEdyb3VwKHRoaXMuc2NvcGUsICd1c2Vycy1ncm91cCcsIHtcbiAgICAgIGdyb3VwTmFtZTogJ1VzZXJzJyxcbiAgICAgIHVzZXJQb29sSWQ6IHRoaXMudXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGRlZmF1bHQgZ3JvdXAgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlcnMnLFxuICAgICAgcHJlY2VkZW5jZTogMyxcbiAgICAgIHJvbGVBcm46IHRoaXMudXNlclJvbGUucm9sZUFybixcbiAgICB9KVxuXG4gICAgbmV3IENmblVzZXJQb29sR3JvdXAodGhpcy5zY29wZSwgJ2FkbWlucy1ncm91cCcsIHtcbiAgICAgIGdyb3VwTmFtZTogJ0FkbWlucycsXG4gICAgICB1c2VyUG9vbElkOiB0aGlzLnVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBncm91cCBmb3IgYWRtaW4gdXNlcnMgd2l0aCBzcGVjaWZpYyBwcml2aWxlZ2VzJyxcbiAgICAgIHByZWNlZGVuY2U6IDIsXG4gICAgICByb2xlQXJuOiB0aGlzLmFkbWluUm9sZS5yb2xlQXJuLFxuICAgIH0pXG5cbiAgICBuZXcgQ2ZuSWRlbnRpdHlQb29sUm9sZUF0dGFjaG1lbnQodGhpcy5zY29wZSwgJ2lkZW50aXR5LXBvb2wtcm9sZS1hdHRhY2htZW50Jywge1xuICAgICAgaWRlbnRpdHlQb29sSWQ6IHRoaXMuaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIHJvbGVzOiB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHRoaXMudXNlclJvbGUucm9sZUFybixcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB0aGlzLmFub255bW91c1JvbGUucm9sZUFybixcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuIl19