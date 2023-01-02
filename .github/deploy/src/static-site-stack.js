"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSiteStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const index_1 = require("./aws/s3/index");
const config_1 = require("../config");
const index_2 = require("./aws/helpers/index");
const index_3 = require("./aws/route53/index");
const index_4 = require("./aws/certificate/index");
const headers_1 = require("./aws/headers");
const index_5 = require("./aws/cloudfront/index");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const path_1 = require("path");
class StaticSiteStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { deploymentEnvironment } = props;
        const isProduction = deploymentEnvironment === 'prod';
        const domainName = 'clubwoof.co.uk';
        const url = isProduction ? 'clubwoof.co.uk' : 'dev.clubwoof.co.uk';
        const assetsBucket = (0, index_1.createBucket)({
            bucketName: `${config_1.default.STACK_PREFIX}-bucket`,
            scope: this,
            env: deploymentEnvironment,
        });
        (0, index_1.createBucketDeployment)({
            scope: this,
            bucket: assetsBucket,
            filePath: './out',
            env: deploymentEnvironment,
        });
        const cloudfrontOriginAccessIdentity = (0, index_2.handleAccessIdentity)(this, assetsBucket);
        const zone = (0, index_3.getHostedZone)({ scope: this, domainName });
        const certificate = (0, index_4.createCertificate)({
            scope: this,
            url,
            hostedZone: zone,
        });
        const responseHeaderPolicy = (0, headers_1.getSecurityHeader)(this);
        const rewriteFunction = new aws_cloudfront_1.Function(this, 'ViewerResponseFunction2', {
            functionName: 'RedirectURIFunction2',
            code: aws_cloudfront_1.FunctionCode.fromFile({ filePath: (0, path_1.join)(__dirname, 'functions', 'mapping-function.js') }),
            comment: 'adds index.html to requests',
        });
        const cloudfrontDistribution = (0, index_5.createDistribution)({
            scope: this,
            bucket: assetsBucket,
            url,
            certificate: certificate,
            accessIdentity: cloudfrontOriginAccessIdentity,
            responseHeaderPolicy: responseHeaderPolicy,
            functionAssociation: rewriteFunction,
            env: deploymentEnvironment,
        });
        (0, index_3.createARecordForDistribution)({
            scope: this,
            hostedZone: zone,
            url,
            distribution: cloudfrontDistribution,
        });
    }
}
exports.StaticSiteStack = StaticSiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBK0M7QUFDL0MsMENBQXFFO0FBQ3JFLHNDQUE4QjtBQUM5QiwrQ0FBMEQ7QUFDMUQsK0NBQWlGO0FBQ2pGLG1EQUEyRDtBQUMzRCwyQ0FBaUQ7QUFDakQsa0RBQTJEO0FBQzNELCtEQUFtRTtBQUNuRSwrQkFBMkI7QUFNM0IsTUFBYSxlQUFnQixTQUFRLG1CQUFLO0lBQ3hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBMkI7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDdkIsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsS0FBSyxDQUFBO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLHFCQUFxQixLQUFLLE1BQU0sQ0FBQTtRQUNyRCxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQTtRQUNuQyxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQTtRQUVsRSxNQUFNLFlBQVksR0FBRyxJQUFBLG9CQUFZLEVBQUM7WUFDaEMsVUFBVSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLFNBQVM7WUFDM0MsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUscUJBQXFCO1NBQzNCLENBQUMsQ0FBQTtRQUVGLElBQUEsOEJBQXNCLEVBQUM7WUFDckIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsWUFBWTtZQUNwQixRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUscUJBQXFCO1NBQzNCLENBQUMsQ0FBQTtRQUVGLE1BQU0sOEJBQThCLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFFL0UsTUFBTSxJQUFJLEdBQUcsSUFBQSxxQkFBYSxFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBRXZELE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQWlCLEVBQUM7WUFDcEMsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHO1lBQ0gsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLDJCQUFpQixFQUFDLElBQUksQ0FBQyxDQUFBO1FBRXBELE1BQU0sZUFBZSxHQUFHLElBQUkseUJBQVEsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDcEUsWUFBWSxFQUFFLHNCQUFzQjtZQUNwQyxJQUFJLEVBQUUsNkJBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7WUFDOUYsT0FBTyxFQUFFLDZCQUE2QjtTQUN2QyxDQUFDLENBQUE7UUFFRixNQUFNLHNCQUFzQixHQUFHLElBQUEsMEJBQWtCLEVBQUM7WUFDaEQsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsWUFBWTtZQUNwQixHQUFHO1lBQ0gsV0FBVyxFQUFFLFdBQVc7WUFDeEIsY0FBYyxFQUFFLDhCQUE4QjtZQUM5QyxvQkFBb0IsRUFBRSxvQkFBb0I7WUFDMUMsbUJBQW1CLEVBQUUsZUFBZTtZQUNwQyxHQUFHLEVBQUUscUJBQXFCO1NBQzNCLENBQUMsQ0FBQTtRQUVGLElBQUEsb0NBQTRCLEVBQUM7WUFDM0IsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixHQUFHO1lBQ0gsWUFBWSxFQUFFLHNCQUFzQjtTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF6REQsMENBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBjcmVhdGVCdWNrZXQsIGNyZWF0ZUJ1Y2tldERlcGxveW1lbnQgfSBmcm9tICcuL2F3cy9zMy9pbmRleCdcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgaGFuZGxlQWNjZXNzSWRlbnRpdHkgfSBmcm9tICcuL2F3cy9oZWxwZXJzL2luZGV4J1xuaW1wb3J0IHsgY3JlYXRlQVJlY29yZEZvckRpc3RyaWJ1dGlvbiwgZ2V0SG9zdGVkWm9uZSB9IGZyb20gJy4vYXdzL3JvdXRlNTMvaW5kZXgnXG5pbXBvcnQgeyBjcmVhdGVDZXJ0aWZpY2F0ZSB9IGZyb20gJy4vYXdzL2NlcnRpZmljYXRlL2luZGV4J1xuaW1wb3J0IHsgZ2V0U2VjdXJpdHlIZWFkZXIgfSBmcm9tICcuL2F3cy9oZWFkZXJzJ1xuaW1wb3J0IHsgY3JlYXRlRGlzdHJpYnV0aW9uIH0gZnJvbSAnLi9hd3MvY2xvdWRmcm9udC9pbmRleCdcbmltcG9ydCB7IEZ1bmN0aW9uLCBGdW5jdGlvbkNvZGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuXG5pbnRlcmZhY2UgU3RhdGljU2l0ZVN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcbiAgZGVwbG95bWVudEVudmlyb25tZW50OiAncHJvZCcgfCAnZGV2J1xufVxuXG5leHBvcnQgY2xhc3MgU3RhdGljU2l0ZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhdGljU2l0ZVN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKVxuICAgIGNvbnN0IHsgZGVwbG95bWVudEVudmlyb25tZW50IH0gPSBwcm9wc1xuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IGRlcGxveW1lbnRFbnZpcm9ubWVudCA9PT0gJ3Byb2QnXG4gICAgY29uc3QgZG9tYWluTmFtZSA9ICdjbHVid29vZi5jby51aydcbiAgICBjb25zdCB1cmwgPSBpc1Byb2R1Y3Rpb24gPyAnY2x1Yndvb2YuY28udWsnIDogJ2Rldi5jbHVid29vZi5jby51aydcblxuICAgIGNvbnN0IGFzc2V0c0J1Y2tldCA9IGNyZWF0ZUJ1Y2tldCh7XG4gICAgICBidWNrZXROYW1lOiBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1idWNrZXRgLFxuICAgICAgc2NvcGU6IHRoaXMsXG4gICAgICBlbnY6IGRlcGxveW1lbnRFbnZpcm9ubWVudCxcbiAgICB9KVxuXG4gICAgY3JlYXRlQnVja2V0RGVwbG95bWVudCh7XG4gICAgICBzY29wZTogdGhpcyxcbiAgICAgIGJ1Y2tldDogYXNzZXRzQnVja2V0LFxuICAgICAgZmlsZVBhdGg6ICcuL291dCcsXG4gICAgICBlbnY6IGRlcGxveW1lbnRFbnZpcm9ubWVudCxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5ID0gaGFuZGxlQWNjZXNzSWRlbnRpdHkodGhpcywgYXNzZXRzQnVja2V0KVxuXG4gICAgY29uc3Qgem9uZSA9IGdldEhvc3RlZFpvbmUoeyBzY29wZTogdGhpcywgZG9tYWluTmFtZSB9KVxuXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBjcmVhdGVDZXJ0aWZpY2F0ZSh7XG4gICAgICBzY29wZTogdGhpcyxcbiAgICAgIHVybCxcbiAgICAgIGhvc3RlZFpvbmU6IHpvbmUsXG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVyUG9saWN5ID0gZ2V0U2VjdXJpdHlIZWFkZXIodGhpcylcblxuICAgIGNvbnN0IHJld3JpdGVGdW5jdGlvbiA9IG5ldyBGdW5jdGlvbih0aGlzLCAnVmlld2VyUmVzcG9uc2VGdW5jdGlvbjInLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6ICdSZWRpcmVjdFVSSUZ1bmN0aW9uMicsXG4gICAgICBjb2RlOiBGdW5jdGlvbkNvZGUuZnJvbUZpbGUoeyBmaWxlUGF0aDogam9pbihfX2Rpcm5hbWUsICdmdW5jdGlvbnMnLCAnbWFwcGluZy1mdW5jdGlvbi5qcycpIH0pLFxuICAgICAgY29tbWVudDogJ2FkZHMgaW5kZXguaHRtbCB0byByZXF1ZXN0cycsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsb3VkZnJvbnREaXN0cmlidXRpb24gPSBjcmVhdGVEaXN0cmlidXRpb24oe1xuICAgICAgc2NvcGU6IHRoaXMsXG4gICAgICBidWNrZXQ6IGFzc2V0c0J1Y2tldCxcbiAgICAgIHVybCxcbiAgICAgIGNlcnRpZmljYXRlOiBjZXJ0aWZpY2F0ZSxcbiAgICAgIGFjY2Vzc0lkZW50aXR5OiBjbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHksXG4gICAgICByZXNwb25zZUhlYWRlclBvbGljeTogcmVzcG9uc2VIZWFkZXJQb2xpY3ksXG4gICAgICBmdW5jdGlvbkFzc29jaWF0aW9uOiByZXdyaXRlRnVuY3Rpb24sXG4gICAgICBlbnY6IGRlcGxveW1lbnRFbnZpcm9ubWVudCxcbiAgICB9KVxuXG4gICAgY3JlYXRlQVJlY29yZEZvckRpc3RyaWJ1dGlvbih7XG4gICAgICBzY29wZTogdGhpcyxcbiAgICAgIGhvc3RlZFpvbmU6IHpvbmUsXG4gICAgICB1cmwsXG4gICAgICBkaXN0cmlidXRpb246IGNsb3VkZnJvbnREaXN0cmlidXRpb24sXG4gICAgfSlcbiAgfVxufVxuIl19