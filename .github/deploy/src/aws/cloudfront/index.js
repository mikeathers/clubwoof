"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDistribution = void 0;
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
const config_1 = require("../../../config");
const createDistribution = (props) => {
    const { scope, bucket, url, certificate, functionAssociation, accessIdentity, responseHeaderPolicy, env } = props;
    return new aws_cloudfront_1.Distribution(scope, `${config_1.default.STACK_PREFIX}-cloudfront-distribution-${env}`, {
        certificate: certificate,
        enableLogging: true,
        domainNames: [url],
        defaultRootObject: 'index.html',
        defaultBehavior: {
            origin: new aws_cloudfront_origins_1.S3Origin(bucket, {
                originAccessIdentity: accessIdentity,
            }),
            functionAssociations: [
                {
                    function: functionAssociation,
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
};
exports.createDistribution = createDistribution;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrREFRbUM7QUFHbkMsK0VBQTZEO0FBQzdELDRDQUFvQztBQWE3QixNQUFNLGtCQUFrQixHQUFHLENBQUMsS0FBOEIsRUFBaUIsRUFBRTtJQUNsRixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFFakgsT0FBTyxJQUFJLDZCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLDRCQUE0QixHQUFHLEVBQUUsRUFBRTtRQUN0RixXQUFXLEVBQUUsV0FBVztRQUN4QixhQUFhLEVBQUUsSUFBSTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDbEIsaUJBQWlCLEVBQUUsWUFBWTtRQUMvQixlQUFlLEVBQUU7WUFDZixNQUFNLEVBQUUsSUFBSSxpQ0FBUSxDQUFDLE1BQU0sRUFBRTtnQkFDM0Isb0JBQW9CLEVBQUUsY0FBYzthQUNyQyxDQUFDO1lBQ0Ysb0JBQW9CLEVBQUU7Z0JBQ3BCO29CQUNFLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxrQ0FBaUIsQ0FBQyxjQUFjO2lCQUM1QzthQUNGO1lBQ0Qsb0JBQW9CLEVBQUUscUNBQW9CLENBQUMsaUJBQWlCO1lBQzVELHFCQUFxQixFQUFFLG9CQUFvQjtTQUM1QztRQUNELGNBQWMsRUFBRTtZQUNkO2dCQUNFLFVBQVUsRUFBRSxHQUFHO2dCQUNmLGtCQUFrQixFQUFFLEdBQUc7Z0JBQ3ZCLGdCQUFnQixFQUFFLFdBQVc7YUFDOUI7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTdCWSxRQUFBLGtCQUFrQixzQkE2QjlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7XG4gIERpc3RyaWJ1dGlvbixcbiAgRnVuY3Rpb25FdmVudFR5cGUsXG4gIElEaXN0cmlidXRpb24sXG4gIElGdW5jdGlvbixcbiAgT3JpZ2luQWNjZXNzSWRlbnRpdHksXG4gIFJlc3BvbnNlSGVhZGVyc1BvbGljeSxcbiAgVmlld2VyUHJvdG9jb2xQb2xpY3ksXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250J1xuaW1wb3J0IHsgSUJ1Y2tldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMydcbmltcG9ydCB7IElDZXJ0aWZpY2F0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInXG5pbXBvcnQgeyBTM09yaWdpbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uLy4uL2NvbmZpZydcblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVEaXN0cmlidXRpb25Qcm9wcyB7XG4gIHNjb3BlOiBTdGFja1xuICBidWNrZXQ6IElCdWNrZXRcbiAgdXJsOiBzdHJpbmdcbiAgY2VydGlmaWNhdGU6IElDZXJ0aWZpY2F0ZVxuICBmdW5jdGlvbkFzc29jaWF0aW9uOiBJRnVuY3Rpb25cbiAgYWNjZXNzSWRlbnRpdHk6IE9yaWdpbkFjY2Vzc0lkZW50aXR5XG4gIHJlc3BvbnNlSGVhZGVyUG9saWN5OiBSZXNwb25zZUhlYWRlcnNQb2xpY3lcbiAgZW52OiAncHJvZCcgfCAnZGV2J1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlzdHJpYnV0aW9uID0gKHByb3BzOiBDcmVhdGVEaXN0cmlidXRpb25Qcm9wcyk6IElEaXN0cmlidXRpb24gPT4ge1xuICBjb25zdCB7IHNjb3BlLCBidWNrZXQsIHVybCwgY2VydGlmaWNhdGUsIGZ1bmN0aW9uQXNzb2NpYXRpb24sIGFjY2Vzc0lkZW50aXR5LCByZXNwb25zZUhlYWRlclBvbGljeSwgZW52IH0gPSBwcm9wc1xuXG4gIHJldHVybiBuZXcgRGlzdHJpYnV0aW9uKHNjb3BlLCBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1jbG91ZGZyb250LWRpc3RyaWJ1dGlvbi0ke2Vudn1gLCB7XG4gICAgY2VydGlmaWNhdGU6IGNlcnRpZmljYXRlLFxuICAgIGVuYWJsZUxvZ2dpbmc6IHRydWUsXG4gICAgZG9tYWluTmFtZXM6IFt1cmxdLFxuICAgIGRlZmF1bHRSb290T2JqZWN0OiAnaW5kZXguaHRtbCcsXG4gICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICBvcmlnaW46IG5ldyBTM09yaWdpbihidWNrZXQsIHtcbiAgICAgICAgb3JpZ2luQWNjZXNzSWRlbnRpdHk6IGFjY2Vzc0lkZW50aXR5LFxuICAgICAgfSksXG4gICAgICBmdW5jdGlvbkFzc29jaWF0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnVuY3Rpb246IGZ1bmN0aW9uQXNzb2NpYXRpb24sXG4gICAgICAgICAgZXZlbnRUeXBlOiBGdW5jdGlvbkV2ZW50VHlwZS5WSUVXRVJfUkVRVUVTVCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICByZXNwb25zZUhlYWRlcnNQb2xpY3k6IHJlc3BvbnNlSGVhZGVyUG9saWN5LFxuICAgIH0sXG4gICAgZXJyb3JSZXNwb25zZXM6IFtcbiAgICAgIHtcbiAgICAgICAgaHR0cFN0YXR1czogNDA0LFxuICAgICAgICByZXNwb25zZUh0dHBTdGF0dXM6IDQwNCxcbiAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogJy80MDQuaHRtbCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH0pXG59XG4iXX0=