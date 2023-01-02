"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDistribution = void 0;
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
const config_1 = require("../../../config");
const createDistribution = (props) => {
    const { scope, bucket, url, certificate, accessIdentity, responseHeaderPolicy, functionAssociation, env } = props;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrREFRbUM7QUFHbkMsK0VBQTZEO0FBQzdELDRDQUFvQztBQWE3QixNQUFNLGtCQUFrQixHQUFHLENBQUMsS0FBOEIsRUFBaUIsRUFBRTtJQUNsRixNQUFNLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEVBQUMsR0FBRyxLQUFLLENBQUE7SUFFL0csT0FBTyxJQUFJLDZCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLDRCQUE0QixHQUFHLEVBQUUsRUFBRTtRQUN0RixXQUFXLEVBQUUsV0FBVztRQUN4QixhQUFhLEVBQUUsSUFBSTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDbEIsaUJBQWlCLEVBQUUsWUFBWTtRQUMvQixlQUFlLEVBQUU7WUFDZixNQUFNLEVBQUUsSUFBSSxpQ0FBUSxDQUFDLE1BQU0sRUFBRTtnQkFDM0Isb0JBQW9CLEVBQUUsY0FBYzthQUNyQyxDQUFDO1lBQ0Ysb0JBQW9CLEVBQUU7Z0JBQ3BCO29CQUNFLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFNBQVMsRUFBRSxrQ0FBaUIsQ0FBQyxjQUFjO2lCQUM1QzthQUNGO1lBQ0Qsb0JBQW9CLEVBQUUscUNBQW9CLENBQUMsaUJBQWlCO1lBQzVELHFCQUFxQixFQUFFLG9CQUFvQjtTQUM1QztRQUNELGNBQWMsRUFBRTtZQUNkO2dCQUNFLFVBQVUsRUFBRSxHQUFHO2dCQUNmLGtCQUFrQixFQUFFLEdBQUc7Z0JBQ3ZCLGdCQUFnQixFQUFFLFdBQVc7YUFDOUI7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQTdCWSxRQUFBLGtCQUFrQixzQkE2QjlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7XG4gIERpc3RyaWJ1dGlvbixcbiAgRnVuY3Rpb25FdmVudFR5cGUsXG4gIElEaXN0cmlidXRpb24sXG4gIElGdW5jdGlvbixcbiAgT3JpZ2luQWNjZXNzSWRlbnRpdHksXG4gIFJlc3BvbnNlSGVhZGVyc1BvbGljeSxcbiAgVmlld2VyUHJvdG9jb2xQb2xpY3ksXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250J1xuaW1wb3J0IHsgSUJ1Y2tldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMydcbmltcG9ydCB7IElDZXJ0aWZpY2F0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInXG5pbXBvcnQgeyBTM09yaWdpbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uLy4uLy4uL2NvbmZpZydcblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVEaXN0cmlidXRpb25Qcm9wcyB7XG4gIHNjb3BlOiBTdGFja1xuICBidWNrZXQ6IElCdWNrZXRcbiAgdXJsOiBzdHJpbmdcbiAgY2VydGlmaWNhdGU6IElDZXJ0aWZpY2F0ZVxuICBhY2Nlc3NJZGVudGl0eTogT3JpZ2luQWNjZXNzSWRlbnRpdHlcbiAgcmVzcG9uc2VIZWFkZXJQb2xpY3k6IFJlc3BvbnNlSGVhZGVyc1BvbGljeVxuICBmdW5jdGlvbkFzc29jaWF0aW9uOiBJRnVuY3Rpb25cbiAgZW52OiAncHJvZCcgfCAnZGV2J1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlzdHJpYnV0aW9uID0gKHByb3BzOiBDcmVhdGVEaXN0cmlidXRpb25Qcm9wcyk6IElEaXN0cmlidXRpb24gPT4ge1xuICBjb25zdCB7c2NvcGUsIGJ1Y2tldCwgdXJsLCBjZXJ0aWZpY2F0ZSwgYWNjZXNzSWRlbnRpdHksIHJlc3BvbnNlSGVhZGVyUG9saWN5LCBmdW5jdGlvbkFzc29jaWF0aW9uLCBlbnZ9ID0gcHJvcHNcblxuICByZXR1cm4gbmV3IERpc3RyaWJ1dGlvbihzY29wZSwgYCR7Q09ORklHLlNUQUNLX1BSRUZJWH0tY2xvdWRmcm9udC1kaXN0cmlidXRpb24tJHtlbnZ9YCwge1xuICAgIGNlcnRpZmljYXRlOiBjZXJ0aWZpY2F0ZSxcbiAgICBlbmFibGVMb2dnaW5nOiB0cnVlLFxuICAgIGRvbWFpbk5hbWVzOiBbdXJsXSxcbiAgICBkZWZhdWx0Um9vdE9iamVjdDogJ2luZGV4Lmh0bWwnLFxuICAgIGRlZmF1bHRCZWhhdmlvcjoge1xuICAgICAgb3JpZ2luOiBuZXcgUzNPcmlnaW4oYnVja2V0LCB7XG4gICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OiBhY2Nlc3NJZGVudGl0eSxcbiAgICAgIH0pLFxuICAgICAgZnVuY3Rpb25Bc3NvY2lhdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZ1bmN0aW9uOiBmdW5jdGlvbkFzc29jaWF0aW9uLFxuICAgICAgICAgIGV2ZW50VHlwZTogRnVuY3Rpb25FdmVudFR5cGUuVklFV0VSX1JFUVVFU1QsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IFZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzUG9saWN5OiByZXNwb25zZUhlYWRlclBvbGljeSxcbiAgICB9LFxuICAgIGVycm9yUmVzcG9uc2VzOiBbXG4gICAgICB7XG4gICAgICAgIGh0dHBTdGF0dXM6IDQwNCxcbiAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiA0MDQsXG4gICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvNDA0Lmh0bWwnLFxuICAgICAgfSxcbiAgICBdLFxuICB9KVxufVxuIl19