"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPoolClientConstruct = void 0;
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
const config_1 = require("../../config");
class UserPoolClientConstruct {
    constructor(scope, userPool) {
        this.scope = scope;
        this.userPool = userPool;
        this.createUserPoolClient();
    }
    createUserPoolClient() {
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
        };
        const clientReadAttributes = new aws_cognito_1.ClientAttributes()
            .withStandardAttributes(standardCognitoAttributes)
            .withCustomAttributes(...['numberOfDogs', 'isAdmin']);
        const clientWriteAttributes = new aws_cognito_1.ClientAttributes()
            .withStandardAttributes({
            ...standardCognitoAttributes,
            emailVerified: false,
            phoneNumberVerified: false,
        })
            .withCustomAttributes(...['numberOfDogs']);
        this.userPoolClient = new aws_cognito_1.UserPoolClient(this.scope, 'clubwoof-user-pool-client', {
            userPoolClientName: `${config_1.default.STACK_PREFIX}-${config_1.default.DEPLOY_ENVIRONMENT}`,
            userPool: this.userPool,
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userSrp: true,
            },
            supportedIdentityProviders: [aws_cognito_1.UserPoolClientIdentityProvider.COGNITO],
            readAttributes: clientReadAttributes,
            writeAttributes: clientWriteAttributes,
        });
    }
}
exports.UserPoolClientConstruct = UserPoolClientConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wb29sLWNsaWVudC5jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLXBvb2wtY2xpZW50LmNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFBa0g7QUFDbEgseUNBQWlDO0FBRWpDLE1BQWEsdUJBQXVCO0lBTWxDLFlBQVksS0FBZ0IsRUFBRSxRQUFrQjtRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLE1BQU0seUJBQXlCLEdBQUc7WUFDaEMsU0FBUyxFQUFFLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsSUFBSTtZQUNqQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsV0FBVyxFQUFFLElBQUk7WUFDakIsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQTtRQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw4QkFBZ0IsRUFBRTthQUNoRCxzQkFBc0IsQ0FBQyx5QkFBeUIsQ0FBQzthQUNqRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFdkQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLDhCQUFnQixFQUFFO2FBQ2pELHNCQUFzQixDQUFDO1lBQ3RCLEdBQUcseUJBQXlCO1lBQzVCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLG1CQUFtQixFQUFFLEtBQUs7U0FDM0IsQ0FBQzthQUNELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBRTVDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSw0QkFBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsMkJBQTJCLEVBQUU7WUFDaEYsa0JBQWtCLEVBQUUsR0FBRyxnQkFBTSxDQUFDLFlBQVksSUFBSSxnQkFBTSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELDBCQUEwQixFQUFFLENBQUMsNENBQThCLENBQUMsT0FBTyxDQUFDO1lBQ3BFLGNBQWMsRUFBRSxvQkFBb0I7WUFDcEMsZUFBZSxFQUFFLHFCQUFxQjtTQUN2QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF6REQsMERBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3R9IGZyb20gJ2NvbnN0cnVjdHMnXHJpbXBvcnQge0NsaWVudEF0dHJpYnV0ZXMsIFVzZXJQb29sLCBVc2VyUG9vbENsaWVudCwgVXNlclBvb2xDbGllbnRJZGVudGl0eVByb3ZpZGVyfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29nbml0bydccmltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vY29uZmlnJ1xyXHJleHBvcnQgY2xhc3MgVXNlclBvb2xDbGllbnRDb25zdHJ1Y3Qge1xyICAvLyBAdHMtaWdub3JlXHIgIHB1YmxpYyB1c2VyUG9vbENsaWVudDogVXNlclBvb2xDbGllbnRcciAgcHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0XHIgIHByaXZhdGUgcmVhZG9ubHkgdXNlclBvb2w6IFVzZXJQb29sXHJcciAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgdXNlclBvb2w6IFVzZXJQb29sKSB7XHIgICAgdGhpcy5zY29wZSA9IHNjb3BlXHIgICAgdGhpcy51c2VyUG9vbCA9IHVzZXJQb29sXHIgICAgdGhpcy5jcmVhdGVVc2VyUG9vbENsaWVudCgpXHIgIH1cclxyICBwcml2YXRlIGNyZWF0ZVVzZXJQb29sQ2xpZW50KCkge1xyICAgIGNvbnN0IHN0YW5kYXJkQ29nbml0b0F0dHJpYnV0ZXMgPSB7XHIgICAgICBnaXZlbk5hbWU6IHRydWUsXHIgICAgICBmYW1pbHlOYW1lOiB0cnVlLFxyICAgICAgZW1haWw6IHRydWUsXHIgICAgICBlbWFpbFZlcmlmaWVkOiB0cnVlLFxyICAgICAgYWRkcmVzczogdHJ1ZSxcciAgICAgIGJpcnRoZGF0ZTogdHJ1ZSxcciAgICAgIGdlbmRlcjogdHJ1ZSxcciAgICAgIG1pZGRsZU5hbWU6IHRydWUsXHIgICAgICBmdWxsbmFtZTogdHJ1ZSxcciAgICAgIG5pY2tuYW1lOiB0cnVlLFxyICAgICAgcGhvbmVOdW1iZXI6IHRydWUsXHIgICAgICBwaG9uZU51bWJlclZlcmlmaWVkOiB0cnVlLFxyICAgICAgcHJvZmlsZVBpY3R1cmU6IHRydWUsXHIgICAgICBwcmVmZXJyZWRVc2VybmFtZTogdHJ1ZSxcciAgICAgIHByb2ZpbGVQYWdlOiB0cnVlLFxyICAgICAgbGFzdFVwZGF0ZVRpbWU6IHRydWUsXHIgICAgfVxyXHIgICAgY29uc3QgY2xpZW50UmVhZEF0dHJpYnV0ZXMgPSBuZXcgQ2xpZW50QXR0cmlidXRlcygpXHIgICAgICAud2l0aFN0YW5kYXJkQXR0cmlidXRlcyhzdGFuZGFyZENvZ25pdG9BdHRyaWJ1dGVzKVxyICAgICAgLndpdGhDdXN0b21BdHRyaWJ1dGVzKC4uLlsnbnVtYmVyT2ZEb2dzJywgJ2lzQWRtaW4nXSlcclxyICAgIGNvbnN0IGNsaWVudFdyaXRlQXR0cmlidXRlcyA9IG5ldyBDbGllbnRBdHRyaWJ1dGVzKClcciAgICAgIC53aXRoU3RhbmRhcmRBdHRyaWJ1dGVzKHtcciAgICAgICAgLi4uc3RhbmRhcmRDb2duaXRvQXR0cmlidXRlcyxcciAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXHIgICAgICAgIHBob25lTnVtYmVyVmVyaWZpZWQ6IGZhbHNlLFxyICAgICAgfSlcciAgICAgIC53aXRoQ3VzdG9tQXR0cmlidXRlcyguLi5bJ251bWJlck9mRG9ncyddKVxyXHIgICAgdGhpcy51c2VyUG9vbENsaWVudCA9IG5ldyBVc2VyUG9vbENsaWVudCh0aGlzLnNjb3BlLCAnY2x1Yndvb2YtdXNlci1wb29sLWNsaWVudCcsIHtcciAgICAgIHVzZXJQb29sQ2xpZW50TmFtZTogYCR7Q09ORklHLlNUQUNLX1BSRUZJWH0tJHtDT05GSUcuREVQTE9ZX0VOVklST05NRU5UfWAsXHIgICAgICB1c2VyUG9vbDogdGhpcy51c2VyUG9vbCxcciAgICAgIGF1dGhGbG93czoge1xyICAgICAgICBhZG1pblVzZXJQYXNzd29yZDogdHJ1ZSxcciAgICAgICAgY3VzdG9tOiB0cnVlLFxyICAgICAgICB1c2VyU3JwOiB0cnVlLFxyICAgICAgfSxcciAgICAgIHN1cHBvcnRlZElkZW50aXR5UHJvdmlkZXJzOiBbVXNlclBvb2xDbGllbnRJZGVudGl0eVByb3ZpZGVyLkNPR05JVE9dLFxyICAgICAgcmVhZEF0dHJpYnV0ZXM6IGNsaWVudFJlYWRBdHRyaWJ1dGVzLFxyICAgICAgd3JpdGVBdHRyaWJ1dGVzOiBjbGllbnRXcml0ZUF0dHJpYnV0ZXMsXHIgICAgfSlcciAgfVxyfVxyIl19