'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserPoolConstruct = void 0
const path_1 = require('path')
const aws_cognito_1 = require('aws-cdk-lib/aws-cognito')
const aws_lambda_nodejs_1 = require('aws-cdk-lib/aws-lambda-nodejs')
const aws_lambda_1 = require('aws-cdk-lib/aws-lambda')
const config_1 = require('../../config')
const aws_cdk_lib_1 = require('aws-cdk-lib')
class UserPoolConstruct {
  constructor(scope) {
    this.scope = scope
    this.createLambdas()
    this.createUserPool()
  }
  createLambdas() {
    this.customMessagesTrigger = new aws_lambda_nodejs_1.NodejsFunction(this.scope, 'custom-messages', {
      runtime: aws_lambda_1.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: aws_cdk_lib_1.Duration.seconds(6),
      handler: 'main',
      entry: (0, path_1.join)(__dirname, '..', 'cognito-triggers', 'custom-messages', 'index.ts'),
      bundling: { externalModules: ['aws-sdk'] },
      environment: {
        FRONTEND_BASE_URL: config_1.default.FRONTEND_BASE_URL,
      },
    })
    this.postConfirmationTrigger = new aws_lambda_nodejs_1.NodejsFunction(this.scope, 'post-confirmation', {
      runtime: aws_lambda_1.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: aws_cdk_lib_1.Duration.seconds(6),
      handler: 'main',
      entry: (0, path_1.join)(__dirname, '..', 'cognito-triggers', 'post-confirmation', 'index.ts'),
      bundling: { externalModules: ['aws-sdk'] },
    })
  }
  createUserPool() {
    this.userPool = new aws_cognito_1.UserPool(this.scope, 'clubwoof-user-pool', {
      userPoolName: `${config_1.default.STACK_PREFIX}-${config_1.default.DEPLOY_ENVIRONMENT}`,
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
        numberOfDogs: new aws_cognito_1.NumberAttribute({ mutable: true }),
        isAdmin: new aws_cognito_1.BooleanAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: aws_cognito_1.AccountRecovery.EMAIL_ONLY,
      removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
      lambdaTriggers: {
        customMessage: this.customMessagesTrigger,
        postConfirmation: this.postConfirmationTrigger,
      },
    })
  }
}
exports.UserPoolConstruct = UserPoolConstruct
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wb29sLmNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXItcG9vbC5jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXlCO0FBQ3pCLHlEQUFvRztBQUNwRyxxRUFBNEQ7QUFDNUQsdURBQThDO0FBRTlDLHlDQUFpQztBQUVqQyw2Q0FBb0Q7QUFFcEQsTUFBYSxpQkFBaUI7SUFTNUIsWUFBWSxLQUFnQjtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtZQUM3RSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxFQUFFLE1BQU07WUFDZixLQUFLLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUM7WUFDL0UsUUFBUSxFQUFFLEVBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFDeEMsV0FBVyxFQUFFO2dCQUNYLGlCQUFpQixFQUFFLGdCQUFNLENBQUMsaUJBQWlCO2FBQzVDO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFO1lBQ2pGLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFLHNCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLFVBQVUsQ0FBQztZQUNqRixRQUFRLEVBQUUsRUFBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQztTQUN6QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFvQixFQUFFO1lBQzdELFlBQVksRUFBRSxHQUFHLGdCQUFNLENBQUMsWUFBWSxJQUFJLGdCQUFNLENBQUMsa0JBQWtCLEVBQUU7WUFDbkUsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLFNBQVMsRUFBRTtvQkFDVCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLElBQUk7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFFBQVEsRUFBRSxJQUFJO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsWUFBWSxFQUFFLElBQUksNkJBQWUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQztnQkFDbEQsT0FBTyxFQUFFLElBQUksOEJBQWdCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDL0M7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1lBQ0QsZUFBZSxFQUFFLDZCQUFlLENBQUMsVUFBVTtZQUMzQyxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGNBQWMsRUFBRTtnQkFDZCxhQUFhLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtnQkFDekMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QjthQUMvQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWhGRCw4Q0FnRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2pvaW59IGZyb20gJ3BhdGgnXG5pbXBvcnQge0FjY291bnRSZWNvdmVyeSwgQm9vbGVhbkF0dHJpYnV0ZSwgTnVtYmVyQXR0cmlidXRlLCBVc2VyUG9vbH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZ25pdG8nXG5pbXBvcnQge05vZGVqc0Z1bmN0aW9ufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcydcbmltcG9ydCB7UnVudGltZX0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSdcblxuaW1wb3J0IENPTkZJRyBmcm9tICcuLi8uLi9jb25maWcnXG5pbXBvcnQge0NvbnN0cnVjdH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7RHVyYXRpb24sIFJlbW92YWxQb2xpY3l9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuXG5leHBvcnQgY2xhc3MgVXNlclBvb2xDb25zdHJ1Y3Qge1xuICAvLyBAdHMtaWdub3JlXG4gIHB1YmxpYyB1c2VyUG9vbDogVXNlclBvb2xcbiAgcHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBjdXN0b21NZXNzYWdlc1RyaWdnZXI6IE5vZGVqc0Z1bmN0aW9uXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBwb3N0Q29uZmlybWF0aW9uVHJpZ2dlcjogTm9kZWpzRnVuY3Rpb25cblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0KSB7XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlXG4gICAgdGhpcy5jcmVhdGVMYW1iZGFzKClcbiAgICB0aGlzLmNyZWF0ZVVzZXJQb29sKClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGFtYmRhcygpIHtcbiAgICB0aGlzLmN1c3RvbU1lc3NhZ2VzVHJpZ2dlciA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLnNjb3BlLCAnY3VzdG9tLW1lc3NhZ2VzJywge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgIG1lbW9yeVNpemU6IDEwMjQsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDYpLFxuICAgICAgaGFuZGxlcjogJ21haW4nLFxuICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnY29nbml0by10cmlnZ2VycycsICdjdXN0b20tbWVzc2FnZXMnLCAnaW5kZXgudHMnKSxcbiAgICAgIGJ1bmRsaW5nOiB7ZXh0ZXJuYWxNb2R1bGVzOiBbJ2F3cy1zZGsnXX0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBGUk9OVEVORF9CQVNFX1VSTDogQ09ORklHLkZST05URU5EX0JBU0VfVVJMLFxuICAgICAgfSxcbiAgICB9KVxuICAgIHRoaXMucG9zdENvbmZpcm1hdGlvblRyaWdnZXIgPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcy5zY29wZSwgJ3Bvc3QtY29uZmlybWF0aW9uJywge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgIG1lbW9yeVNpemU6IDEwMjQsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDYpLFxuICAgICAgaGFuZGxlcjogJ21haW4nLFxuICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnY29nbml0by10cmlnZ2VycycsICdwb3N0LWNvbmZpcm1hdGlvbicsICdpbmRleC50cycpLFxuICAgICAgYnVuZGxpbmc6IHtleHRlcm5hbE1vZHVsZXM6IFsnYXdzLXNkayddfSxcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVVc2VyUG9vbCgpIHtcbiAgICB0aGlzLnVzZXJQb29sID0gbmV3IFVzZXJQb29sKHRoaXMuc2NvcGUsICdjbHVid29vZi11c2VyLXBvb2wnLCB7XG4gICAgICB1c2VyUG9vbE5hbWU6IGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LSR7Q09ORklHLkRFUExPWV9FTlZJUk9OTUVOVH1gLFxuICAgICAgc2VsZlNpZ25VcEVuYWJsZWQ6IHRydWUsXG4gICAgICBzaWduSW5BbGlhc2VzOiB7XG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGdpdmVuTmFtZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGZhbWlseU5hbWU6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjdXN0b21BdHRyaWJ1dGVzOiB7XG4gICAgICAgIG51bWJlck9mRG9nczogbmV3IE51bWJlckF0dHJpYnV0ZSh7bXV0YWJsZTogdHJ1ZX0pLFxuICAgICAgICBpc0FkbWluOiBuZXcgQm9vbGVhbkF0dHJpYnV0ZSh7bXV0YWJsZTogdHJ1ZX0pLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkUG9saWN5OiB7XG4gICAgICAgIG1pbkxlbmd0aDogNixcbiAgICAgICAgcmVxdWlyZUxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZVVwcGVyY2FzZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZURpZ2l0czogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZVN5bWJvbHM6IHRydWUsXG4gICAgICB9LFxuICAgICAgYWNjb3VudFJlY292ZXJ5OiBBY2NvdW50UmVjb3ZlcnkuRU1BSUxfT05MWSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIGxhbWJkYVRyaWdnZXJzOiB7XG4gICAgICAgIGN1c3RvbU1lc3NhZ2U6IHRoaXMuY3VzdG9tTWVzc2FnZXNUcmlnZ2VyLFxuICAgICAgICBwb3N0Q29uZmlybWF0aW9uOiB0aGlzLnBvc3RDb25maXJtYXRpb25UcmlnZ2VyLFxuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG4iXX0=
