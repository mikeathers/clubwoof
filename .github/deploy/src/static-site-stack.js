"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSiteInfraDemoStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const index_1 = require("./aws/s3/index");
const config_1 = require("../config");
const index_2 = require("./aws/helpers/index");
const index_3 = require("./aws/route53/index");
const index_4 = require("./aws/certificate/index");
const headers_1 = require("./aws/headers");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const path_1 = require("path");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
class StaticSiteInfraDemoStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, deploymentEnvironment, props) {
        super(scope, id, props);
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
        const rewriteFunction = new aws_cloudfront_1.Function(this, 'ViewerResponseFunction', {
            functionName: 'RedirectURIFunction',
            code: aws_cloudfront_1.FunctionCode.fromFile({ filePath: (0, path_1.join)(__dirname, 'functions', 'mapping-function.js') }),
            comment: 'adds index.html to requests',
        });
        const responseHeaderPolicy = (0, headers_1.getSecurityHeader)(this);
        const cloudfrontDistribution = new aws_cloudfront_1.Distribution(this, `${config_1.default.STACK_PREFIX}-cloudfront-distribution-${deploymentEnvironment}`, {
            certificate: certificate,
            enableLogging: true,
            domainNames: [url],
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new aws_cloudfront_origins_1.S3Origin(assetsBucket, {
                    originAccessIdentity: cloudfrontOriginAccessIdentity,
                }),
                functionAssociations: [
                    {
                        function: rewriteFunction,
                        eventType: aws_cloudfront_1.FunctionEventType.VIEWER_REQUEST,
                    },
                ],
                viewerProtocolPolicy: aws_cloudfront_1.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                responseHeadersPolicy: responseHeaderPolicy,
            },
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 404,
                    responsePagePath: '/404.html',
                },
            ],
        });
        (0, index_3.createARecordForDistribution)({
            scope: this,
            hostedZone: zone,
            url,
            distribution: cloudfrontDistribution,
        });
    }
}
exports.StaticSiteInfraDemoStack = StaticSiteInfraDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBK0M7QUFDL0MsMENBQXFFO0FBQ3JFLHNDQUE4QjtBQUM5QiwrQ0FBMEQ7QUFDMUQsK0NBQWlGO0FBQ2pGLG1EQUEyRDtBQUMzRCwyQ0FBaUQ7QUFDakQsK0RBTW1DO0FBQ25DLCtCQUEyQjtBQUMzQiwrRUFBNkQ7QUFFN0QsTUFBYSx3QkFBeUIsU0FBUSxtQkFBSztJQUNqRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLHFCQUFxQyxFQUFFLEtBQWtCO1FBQ2pHLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3ZCLE1BQU0sWUFBWSxHQUFHLHFCQUFxQixLQUFLLE1BQU0sQ0FBQTtRQUNyRCxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQTtRQUNuQyxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQTtRQUVsRSxNQUFNLFlBQVksR0FBRyxJQUFBLG9CQUFZLEVBQUM7WUFDaEMsVUFBVSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLFNBQVM7WUFDM0MsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUscUJBQXFCO1NBQzNCLENBQUMsQ0FBQTtRQUVGLElBQUEsOEJBQXNCLEVBQUM7WUFDckIsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsWUFBWTtZQUNwQixRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUscUJBQXFCO1NBQzNCLENBQUMsQ0FBQTtRQUVGLE1BQU0sOEJBQThCLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFFL0UsTUFBTSxJQUFJLEdBQUcsSUFBQSxxQkFBYSxFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBRXZELE1BQU0sV0FBVyxHQUFHLElBQUEseUJBQWlCLEVBQUM7WUFDcEMsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHO1lBQ0gsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxlQUFlLEdBQUcsSUFBSSx5QkFBUSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNuRSxZQUFZLEVBQUUscUJBQXFCO1lBQ25DLElBQUksRUFBRSw2QkFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztZQUM5RixPQUFPLEVBQUUsNkJBQTZCO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwyQkFBaUIsRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUVwRCxNQUFNLHNCQUFzQixHQUFHLElBQUksNkJBQVksQ0FDN0MsSUFBSSxFQUNKLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLDRCQUE0QixxQkFBcUIsRUFBRSxFQUN6RTtZQUNFLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNsQixpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQUUsSUFBSSxpQ0FBUSxDQUFDLFlBQVksRUFBRTtvQkFDakMsb0JBQW9CLEVBQUUsOEJBQThCO2lCQUNyRCxDQUFDO2dCQUNGLG9CQUFvQixFQUFFO29CQUNwQjt3QkFDRSxRQUFRLEVBQUUsZUFBZTt3QkFDekIsU0FBUyxFQUFFLGtDQUFpQixDQUFDLGNBQWM7cUJBQzVDO2lCQUNGO2dCQUNELG9CQUFvQixFQUFFLHFDQUFvQixDQUFDLGlCQUFpQjtnQkFDNUQscUJBQXFCLEVBQUUsb0JBQW9CO2FBQzVDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkO29CQUNFLFVBQVUsRUFBRSxHQUFHO29CQUNmLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGdCQUFnQixFQUFFLFdBQVc7aUJBQzlCO2FBQ0Y7U0FDRixDQUNGLENBQUE7UUFFRCxJQUFBLG9DQUE0QixFQUFDO1lBQzNCLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLElBQUk7WUFDaEIsR0FBRztZQUNILFlBQVksRUFBRSxzQkFBc0I7U0FDckMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBNUVELDREQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnXG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgY3JlYXRlQnVja2V0LCBjcmVhdGVCdWNrZXREZXBsb3ltZW50IH0gZnJvbSAnLi9hd3MvczMvaW5kZXgnXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IGhhbmRsZUFjY2Vzc0lkZW50aXR5IH0gZnJvbSAnLi9hd3MvaGVscGVycy9pbmRleCdcbmltcG9ydCB7IGNyZWF0ZUFSZWNvcmRGb3JEaXN0cmlidXRpb24sIGdldEhvc3RlZFpvbmUgfSBmcm9tICcuL2F3cy9yb3V0ZTUzL2luZGV4J1xuaW1wb3J0IHsgY3JlYXRlQ2VydGlmaWNhdGUgfSBmcm9tICcuL2F3cy9jZXJ0aWZpY2F0ZS9pbmRleCdcbmltcG9ydCB7IGdldFNlY3VyaXR5SGVhZGVyIH0gZnJvbSAnLi9hd3MvaGVhZGVycydcbmltcG9ydCB7XG4gIERpc3RyaWJ1dGlvbixcbiAgRnVuY3Rpb24sXG4gIEZ1bmN0aW9uQ29kZSxcbiAgRnVuY3Rpb25FdmVudFR5cGUsXG4gIFZpZXdlclByb3RvY29sUG9saWN5LFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgUzNPcmlnaW4gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udC1vcmlnaW5zJ1xuXG5leHBvcnQgY2xhc3MgU3RhdGljU2l0ZUluZnJhRGVtb1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBkZXBsb3ltZW50RW52aXJvbm1lbnQ6ICdkZXYnIHwgJ3Byb2QnLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKVxuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IGRlcGxveW1lbnRFbnZpcm9ubWVudCA9PT0gJ3Byb2QnXG4gICAgY29uc3QgZG9tYWluTmFtZSA9ICdjbHVid29vZi5jby51aydcbiAgICBjb25zdCB1cmwgPSBpc1Byb2R1Y3Rpb24gPyAnY2x1Yndvb2YuY28udWsnIDogJ2Rldi5jbHVid29vZi5jby51aydcblxuICAgIGNvbnN0IGFzc2V0c0J1Y2tldCA9IGNyZWF0ZUJ1Y2tldCh7XG4gICAgICBidWNrZXROYW1lOiBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1idWNrZXRgLFxuICAgICAgc2NvcGU6IHRoaXMsXG4gICAgICBlbnY6IGRlcGxveW1lbnRFbnZpcm9ubWVudCxcbiAgICB9KVxuXG4gICAgY3JlYXRlQnVja2V0RGVwbG95bWVudCh7XG4gICAgICBzY29wZTogdGhpcyxcbiAgICAgIGJ1Y2tldDogYXNzZXRzQnVja2V0LFxuICAgICAgZmlsZVBhdGg6ICcuL291dCcsXG4gICAgICBlbnY6IGRlcGxveW1lbnRFbnZpcm9ubWVudCxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5ID0gaGFuZGxlQWNjZXNzSWRlbnRpdHkodGhpcywgYXNzZXRzQnVja2V0KVxuXG4gICAgY29uc3Qgem9uZSA9IGdldEhvc3RlZFpvbmUoeyBzY29wZTogdGhpcywgZG9tYWluTmFtZSB9KVxuXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBjcmVhdGVDZXJ0aWZpY2F0ZSh7XG4gICAgICBzY29wZTogdGhpcyxcbiAgICAgIHVybCxcbiAgICAgIGhvc3RlZFpvbmU6IHpvbmUsXG4gICAgfSlcblxuICAgIGNvbnN0IHJld3JpdGVGdW5jdGlvbiA9IG5ldyBGdW5jdGlvbih0aGlzLCAnVmlld2VyUmVzcG9uc2VGdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ1JlZGlyZWN0VVJJRnVuY3Rpb24nLFxuICAgICAgY29kZTogRnVuY3Rpb25Db2RlLmZyb21GaWxlKHsgZmlsZVBhdGg6IGpvaW4oX19kaXJuYW1lLCAnZnVuY3Rpb25zJywgJ21hcHBpbmctZnVuY3Rpb24uanMnKSB9KSxcbiAgICAgIGNvbW1lbnQ6ICdhZGRzIGluZGV4Lmh0bWwgdG8gcmVxdWVzdHMnLFxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZUhlYWRlclBvbGljeSA9IGdldFNlY3VyaXR5SGVhZGVyKHRoaXMpXG5cbiAgICBjb25zdCBjbG91ZGZyb250RGlzdHJpYnV0aW9uID0gbmV3IERpc3RyaWJ1dGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1jbG91ZGZyb250LWRpc3RyaWJ1dGlvbi0ke2RlcGxveW1lbnRFbnZpcm9ubWVudH1gLFxuICAgICAge1xuICAgICAgICBjZXJ0aWZpY2F0ZTogY2VydGlmaWNhdGUsXG4gICAgICAgIGVuYWJsZUxvZ2dpbmc6IHRydWUsXG4gICAgICAgIGRvbWFpbk5hbWVzOiBbdXJsXSxcbiAgICAgICAgZGVmYXVsdFJvb3RPYmplY3Q6ICdpbmRleC5odG1sJyxcbiAgICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgICAgb3JpZ2luOiBuZXcgUzNPcmlnaW4oYXNzZXRzQnVja2V0LCB7XG4gICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZ1bmN0aW9uQXNzb2NpYXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZ1bmN0aW9uOiByZXdyaXRlRnVuY3Rpb24sXG4gICAgICAgICAgICAgIGV2ZW50VHlwZTogRnVuY3Rpb25FdmVudFR5cGUuVklFV0VSX1JFUVVFU1QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IFZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1BvbGljeTogcmVzcG9uc2VIZWFkZXJQb2xpY3ksXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yUmVzcG9uc2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHR0cFN0YXR1czogNDA0LFxuICAgICAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiA0MDQsXG4gICAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiAnLzQwNC5odG1sJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICApXG5cbiAgICBjcmVhdGVBUmVjb3JkRm9yRGlzdHJpYnV0aW9uKHtcbiAgICAgIHNjb3BlOiB0aGlzLFxuICAgICAgaG9zdGVkWm9uZTogem9uZSxcbiAgICAgIHVybCxcbiAgICAgIGRpc3RyaWJ1dGlvbjogY2xvdWRmcm9udERpc3RyaWJ1dGlvbixcbiAgICB9KVxuICB9XG59XG4iXX0=