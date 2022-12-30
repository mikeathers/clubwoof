"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSiteInfraDemoStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const acm = require("aws-cdk-lib/aws-certificatemanager");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const iam = require("aws-cdk-lib/aws-iam");
const route53 = require("aws-cdk-lib/aws-route53");
const route53targets = require("aws-cdk-lib/aws-route53-targets");
const s3 = require("aws-cdk-lib/aws-s3");
const path_1 = require("path");
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
class StaticSiteInfraDemoStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const domainName = "clubwoof.co.uk";
        const assetsBucket = new s3.Bucket(this, 'clubwoof-website-bucket', {
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.RETAIN,
            accessControl: s3.BucketAccessControl.PRIVATE,
            objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            encryption: s3.BucketEncryption.S3_MANAGED,
        });
        const cloudfrontOriginAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'clubwoof-CloudFrontOriginAccessIdentity');
        assetsBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [assetsBucket.arnForObjects('*')],
            principals: [new iam.CanonicalUserPrincipal(cloudfrontOriginAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
        }));
        const zone = route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: domainName });
        const certificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: domainName,
            hostedZone: zone,
            region: 'us-east-1', // Cloudfront only checks this region for certificates.
        });
        // Add a cloudfront Function to a Distribution
        const rewriteFunction = new cloudfront.Function(this, 'Function', {
            code: cloudfront.FunctionCode.fromFile({ filePath: (0, path_1.join)(__dirname, 'functions', 'mapping-function.js') }),
        });
        const responseHeaderPolicy = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersResponseHeaderPolicy', {
            comment: 'Security headers response header policy',
            securityHeadersBehavior: {
                contentSecurityPolicy: {
                    override: true,
                    contentSecurityPolicy: "default-src 'self'"
                },
                strictTransportSecurity: {
                    override: true,
                    accessControlMaxAge: aws_cdk_lib_1.Duration.days(2 * 365),
                    includeSubdomains: true,
                    preload: true
                },
                contentTypeOptions: {
                    override: true
                },
                referrerPolicy: {
                    override: true,
                    referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN
                },
                xssProtection: {
                    override: true,
                    protection: true,
                    modeBlock: true
                },
                frameOptions: {
                    override: true,
                    frameOption: cloudfront.HeadersFrameOption.DENY
                }
            }
        });
        const cloudfrontDistribution = new cloudfront.Distribution(this, 'clubwoof-CloudFrontDistribution', {
            certificate: certificate,
            enableLogging: true,
            domainNames: [domainName],
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new origins.S3Origin(assetsBucket, {
                    originAccessIdentity: cloudfrontOriginAccessIdentity
                }),
                functionAssociations: [{
                        function: rewriteFunction,
                        eventType: cloudfront.FunctionEventType.VIEWER_REQUEST
                    }],
                viewerProtocolPolicy: aws_cloudfront_1.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                responseHeadersPolicy: responseHeaderPolicy
            },
        });
        new aws_s3_deployment_1.BucketDeployment(this, 'clubwoof-bucketDeployment', {
            destinationBucket: assetsBucket,
            sources: [
                aws_s3_deployment_1.Source.asset('./out')
            ],
            distribution: cloudfrontDistribution
        });
        new route53.ARecord(this, 'ARecord', {
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(cloudfrontDistribution)),
            zone
        });
    }
}
exports.StaticSiteInfraDemoStack = StaticSiteInfraDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBdUU7QUFDdkUsMERBQTBEO0FBQzFELHlEQUF5RDtBQUN6RCwrREFBZ0U7QUFDaEUsOERBQThEO0FBQzlELDJDQUEyQztBQUMzQyxtREFBbUQ7QUFDbkQsa0VBQWtFO0FBQ2xFLHlDQUF5QztBQUN6QywrQkFBMEI7QUFDMUIscUVBQXVFO0FBRXZFLE1BQWEsd0JBQXlCLFNBQVEsbUJBQUs7SUFDakQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQyxNQUFNLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ2xFLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDakQsYUFBYSxFQUFFLDJCQUFhLENBQUMsTUFBTTtZQUNuQyxhQUFhLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQU87WUFDN0MsZUFBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMscUJBQXFCO1lBQ3pELFVBQVUsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtTQUMzQyxDQUFDLENBQUM7UUFFSCxNQUFNLDhCQUE4QixHQUFHLElBQUksVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO1FBRTVILFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDdkQsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsVUFBVSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsc0JBQXNCLENBQUMsOEJBQThCLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUM3SCxDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUV6RixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQ3pFO1lBQ0UsVUFBVSxFQUFFLFVBQVU7WUFDdEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLFdBQVcsRUFBRSx1REFBdUQ7U0FDN0UsQ0FBQyxDQUFDO1FBRUwsOENBQThDO1FBQzlDLE1BQU0sZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2hFLElBQUksRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixDQUFDLEVBQUMsQ0FBQztTQUN4RyxDQUFDLENBQUM7UUFFSCxNQUFNLG9CQUFvQixHQUFHLElBQUksVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxxQ0FBcUMsRUFBRTtZQUM3RyxPQUFPLEVBQUUseUNBQXlDO1lBQ2xELHVCQUF1QixFQUFFO2dCQUN2QixxQkFBcUIsRUFBRTtvQkFDckIsUUFBUSxFQUFFLElBQUk7b0JBQ2QscUJBQXFCLEVBQUUsb0JBQW9CO2lCQUM1QztnQkFDRCx1QkFBdUIsRUFBRTtvQkFDdkIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsbUJBQW1CLEVBQUUsc0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDM0MsaUJBQWlCLEVBQUUsSUFBSTtvQkFDdkIsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxjQUFjLEVBQUUsVUFBVSxDQUFDLHFCQUFxQixDQUFDLCtCQUErQjtpQkFDakY7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLFFBQVEsRUFBRSxJQUFJO29CQUNkLFVBQVUsRUFBRSxJQUFJO29CQUNoQixTQUFTLEVBQUUsSUFBSTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFFBQVEsRUFBRSxJQUFJO29CQUNkLFdBQVcsRUFBRSxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSTtpQkFDaEQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtZQUNsRyxXQUFXLEVBQUUsV0FBVztZQUN4QixhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDekIsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixlQUFlLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0JBQ3pDLG9CQUFvQixFQUFFLDhCQUE4QjtpQkFDckQsQ0FBQztnQkFDRixvQkFBb0IsRUFBRSxDQUFDO3dCQUNyQixRQUFRLEVBQUUsZUFBZTt3QkFDekIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO3FCQUN2RCxDQUFDO2dCQUNGLG9CQUFvQixFQUFFLHFDQUFvQixDQUFDLGlCQUFpQjtnQkFDNUQscUJBQXFCLEVBQUUsb0JBQW9CO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLEVBQUU7WUFDdEQsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsMEJBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLHNCQUFzQjtTQUNyQyxDQUFDLENBQUE7UUFFRixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNuQyxVQUFVLEVBQUUsVUFBVTtZQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNuRyxJQUFJO1NBQ0wsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckdELDREQXFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RydWN0fSBmcm9tICdjb25zdHJ1Y3RzJztccmltcG9ydCB7RHVyYXRpb24sIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tICdhd3MtY2RrLWxpYic7XHJpbXBvcnQgKiBhcyBhY20gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNlcnRpZmljYXRlbWFuYWdlcic7XHJpbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250JztccmltcG9ydCB7Vmlld2VyUHJvdG9jb2xQb2xpY3l9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250JztccmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnQtb3JpZ2lucyc7XHJpbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XHJpbXBvcnQgKiBhcyByb3V0ZTUzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzJztccmltcG9ydCAqIGFzIHJvdXRlNTN0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xyaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztccmltcG9ydCB7am9pbn0gZnJvbSBcInBhdGhcIjtccmltcG9ydCB7QnVja2V0RGVwbG95bWVudCwgU291cmNlfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnRcIjtcclxyZXhwb3J0IGNsYXNzIFN0YXRpY1NpdGVJbmZyYURlbW9TdGFjayBleHRlbmRzIFN0YWNrIHtcciAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHIgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcciAgICBjb25zdCBkb21haW5OYW1lID0gXCJjbHVid29vZi5jby51a1wiO1xyXHIgICAgY29uc3QgYXNzZXRzQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnY2x1Yndvb2Ytd2Vic2l0ZS1idWNrZXQnLCB7XHIgICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcciAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXHIgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LlJFVEFJTixcciAgICAgIGFjY2Vzc0NvbnRyb2w6IHMzLkJ1Y2tldEFjY2Vzc0NvbnRyb2wuUFJJVkFURSxcciAgICAgIG9iamVjdE93bmVyc2hpcDogczMuT2JqZWN0T3duZXJzaGlwLkJVQ0tFVF9PV05FUl9FTkZPUkNFRCxcciAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcciAgICB9KTtcclxyICAgIGNvbnN0IGNsb3VkZnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0eSA9IG5ldyBjbG91ZGZyb250Lk9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsICdjbHVid29vZi1DbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHknKTtcclxyICAgIGFzc2V0c0J1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcciAgICAgIGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXHIgICAgICByZXNvdXJjZXM6IFthc3NldHNCdWNrZXQuYXJuRm9yT2JqZWN0cygnKicpXSxcciAgICAgIHByaW5jaXBhbHM6IFtuZXcgaWFtLkNhbm9uaWNhbFVzZXJQcmluY2lwYWwoY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5LmNsb3VkRnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0eVMzQ2Fub25pY2FsVXNlcklkKV0sXHIgICAgfSkpO1xyXHIgICAgY29uc3Qgem9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tTG9va3VwKHRoaXMsICdIb3N0ZWRab25lJywge2RvbWFpbk5hbWU6IGRvbWFpbk5hbWV9KTtcclxyICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbmV3IGFjbS5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZSh0aGlzLCAnU2l0ZUNlcnRpZmljYXRlJyxcciAgICAgIHtcciAgICAgICAgZG9tYWluTmFtZTogZG9tYWluTmFtZSxcciAgICAgICAgaG9zdGVkWm9uZTogem9uZSxcciAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJywgLy8gQ2xvdWRmcm9udCBvbmx5IGNoZWNrcyB0aGlzIHJlZ2lvbiBmb3IgY2VydGlmaWNhdGVzLlxyICAgICAgfSk7XHJcciAgICAvLyBBZGQgYSBjbG91ZGZyb250IEZ1bmN0aW9uIHRvIGEgRGlzdHJpYnV0aW9uXHIgICAgY29uc3QgcmV3cml0ZUZ1bmN0aW9uID0gbmV3IGNsb3VkZnJvbnQuRnVuY3Rpb24odGhpcywgJ0Z1bmN0aW9uJywge1xyICAgICAgY29kZTogY2xvdWRmcm9udC5GdW5jdGlvbkNvZGUuZnJvbUZpbGUoe2ZpbGVQYXRoOiBqb2luKF9fZGlybmFtZSwgJ2Z1bmN0aW9ucycsICdtYXBwaW5nLWZ1bmN0aW9uLmpzJyl9KSxcciAgICB9KTtcclxyICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVyUG9saWN5ID0gbmV3IGNsb3VkZnJvbnQuUmVzcG9uc2VIZWFkZXJzUG9saWN5KHRoaXMsICdTZWN1cml0eUhlYWRlcnNSZXNwb25zZUhlYWRlclBvbGljeScsIHtcciAgICAgIGNvbW1lbnQ6ICdTZWN1cml0eSBoZWFkZXJzIHJlc3BvbnNlIGhlYWRlciBwb2xpY3knLFxyICAgICAgc2VjdXJpdHlIZWFkZXJzQmVoYXZpb3I6IHtcciAgICAgICAgY29udGVudFNlY3VyaXR5UG9saWN5OiB7XHIgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXHIgICAgICAgICAgY29udGVudFNlY3VyaXR5UG9saWN5OiBcImRlZmF1bHQtc3JjICdzZWxmJ1wiXHIgICAgICAgIH0sXHIgICAgICAgIHN0cmljdFRyYW5zcG9ydFNlY3VyaXR5OiB7XHIgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXHIgICAgICAgICAgYWNjZXNzQ29udHJvbE1heEFnZTogRHVyYXRpb24uZGF5cygyICogMzY1KSxcciAgICAgICAgICBpbmNsdWRlU3ViZG9tYWluczogdHJ1ZSxcciAgICAgICAgICBwcmVsb2FkOiB0cnVlXHIgICAgICAgIH0sXHIgICAgICAgIGNvbnRlbnRUeXBlT3B0aW9uczoge1xyICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXHIgICAgICAgIH0sXHIgICAgICAgIHJlZmVycmVyUG9saWN5OiB7XHIgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXHIgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IGNsb3VkZnJvbnQuSGVhZGVyc1JlZmVycmVyUG9saWN5LlNUUklDVF9PUklHSU5fV0hFTl9DUk9TU19PUklHSU5cciAgICAgICAgfSxcciAgICAgICAgeHNzUHJvdGVjdGlvbjoge1xyICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyICAgICAgICAgIHByb3RlY3Rpb246IHRydWUsXHIgICAgICAgICAgbW9kZUJsb2NrOiB0cnVlXHIgICAgICAgIH0sXHIgICAgICAgIGZyYW1lT3B0aW9uczoge1xyICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyICAgICAgICAgIGZyYW1lT3B0aW9uOiBjbG91ZGZyb250LkhlYWRlcnNGcmFtZU9wdGlvbi5ERU5ZXHIgICAgICAgIH1cciAgICAgIH1cciAgICB9KTtcclxyICAgIGNvbnN0IGNsb3VkZnJvbnREaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgJ2NsdWJ3b29mLUNsb3VkRnJvbnREaXN0cmlidXRpb24nLCB7XHIgICAgICBjZXJ0aWZpY2F0ZTogY2VydGlmaWNhdGUsXHIgICAgICBlbmFibGVMb2dnaW5nOiB0cnVlLFxyICAgICAgZG9tYWluTmFtZXM6IFtkb21haW5OYW1lXSxcciAgICAgIGRlZmF1bHRSb290T2JqZWN0OiAnaW5kZXguaHRtbCcsXHIgICAgICBkZWZhdWx0QmVoYXZpb3I6IHtcciAgICAgICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbihhc3NldHNCdWNrZXQsIHtcciAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5XHIgICAgICAgIH0pLFxyICAgICAgICBmdW5jdGlvbkFzc29jaWF0aW9uczogW3tcciAgICAgICAgICBmdW5jdGlvbjogcmV3cml0ZUZ1bmN0aW9uLFxyICAgICAgICAgIGV2ZW50VHlwZTogY2xvdWRmcm9udC5GdW5jdGlvbkV2ZW50VHlwZS5WSUVXRVJfUkVRVUVTVFxyICAgICAgICB9XSxcciAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IFZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxyICAgICAgICByZXNwb25zZUhlYWRlcnNQb2xpY3k6IHJlc3BvbnNlSGVhZGVyUG9saWN5XHIgICAgICB9LFxyICAgIH0pO1xyXHIgICAgbmV3IEJ1Y2tldERlcGxveW1lbnQodGhpcywgJ2NsdWJ3b29mLWJ1Y2tldERlcGxveW1lbnQnLCB7XHIgICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogYXNzZXRzQnVja2V0LFxyICAgICAgc291cmNlczogW1xyICAgICAgICBTb3VyY2UuYXNzZXQoJy4vb3V0JylcciAgICAgIF0sXHIgICAgICBkaXN0cmlidXRpb246IGNsb3VkZnJvbnREaXN0cmlidXRpb25cciAgICB9KVxyXHIgICAgbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCAnQVJlY29yZCcsIHtcciAgICAgIHJlY29yZE5hbWU6IGRvbWFpbk5hbWUsXHIgICAgICB0YXJnZXQ6IHJvdXRlNTMuUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhuZXcgcm91dGU1M3RhcmdldHMuQ2xvdWRGcm9udFRhcmdldChjbG91ZGZyb250RGlzdHJpYnV0aW9uKSksXHIgICAgICB6b25lXHIgICAgfSk7XHIgIH1ccn0iXX0=