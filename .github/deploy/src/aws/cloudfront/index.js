"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDistribution = exports.createFunction = void 0;
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
const createFunction = (props) => {
    const { scope, functionName, filePath } = props;
    return new aws_cloudfront_1.Function(scope, 'mappingFunction', {
        functionName: functionName,
        code: aws_cloudfront_1.FunctionCode.fromFile({
            filePath
        })
    });
};
exports.createFunction = createFunction;
const createDistribution = (props) => {
    const { scope, bucket, certificate, url, functionAssociation } = props;
    return new aws_cloudfront_1.Distribution(scope, 'distribution', {
        domainNames: [url],
        defaultBehavior: {
            origin: new aws_cloudfront_origins_1.S3Origin(bucket),
            // functionAssociations: [
            //   {
            //     function: functionAssociation,
            //     eventType: FunctionEventType.VIEWER_REQUEST
            //   }
            // ]
        },
        // certificate,
        defaultRootObject: '/index.html',
        errorResponses: [
            {
                httpStatus: 404,
                responseHttpStatus: 404,
                responsePagePath: '/404.html'
            }
        ]
    });
};
exports.createDistribution = createDistribution;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrREFBMEc7QUFHMUcsK0VBQTREO0FBUXJELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBMEIsRUFBYSxFQUFFO0lBQ3RFLE1BQU0sRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBQyxHQUFHLEtBQUssQ0FBQTtJQUU3QyxPQUFPLElBQUkseUJBQVEsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDNUMsWUFBWSxFQUFFLFlBQVk7UUFDMUIsSUFBSSxFQUFFLDZCQUFZLENBQUMsUUFBUSxDQUFDO1lBQzFCLFFBQVE7U0FDVCxDQUFDO0tBQ0gsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBVFksUUFBQSxjQUFjLGtCQVMxQjtBQVVNLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxLQUE4QixFQUFpQixFQUFFO0lBQ2xGLE1BQU0sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUMsR0FBRyxLQUFLLENBQUE7SUFFcEUsT0FBTyxJQUFJLDZCQUFZLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtRQUM3QyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDbEIsZUFBZSxFQUFFO1lBQ2YsTUFBTSxFQUFFLElBQUksaUNBQVEsQ0FBQyxNQUFNLENBQUM7WUFDNUIsMEJBQTBCO1lBQzFCLE1BQU07WUFDTixxQ0FBcUM7WUFDckMsa0RBQWtEO1lBQ2xELE1BQU07WUFDTixJQUFJO1NBQ0w7UUFDRCxlQUFlO1FBQ2YsaUJBQWlCLEVBQUUsYUFBYTtRQUNoQyxjQUFjLEVBQUU7WUFDZDtnQkFDRSxVQUFVLEVBQUUsR0FBRztnQkFDZixrQkFBa0IsRUFBRSxHQUFHO2dCQUN2QixnQkFBZ0IsRUFBRSxXQUFXO2FBQzlCO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUF4QlksUUFBQSxrQkFBa0Isc0JBd0I5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RhY2t9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyaW1wb3J0IHtEaXN0cmlidXRpb24sIEZ1bmN0aW9uLCBGdW5jdGlvbkNvZGUsIElEaXN0cmlidXRpb24sIElGdW5jdGlvbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZGZyb250XCI7XHJpbXBvcnQge0lCdWNrZXR9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczNcIjtccmltcG9ydCB7SUNlcnRpZmljYXRlfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNlcnRpZmljYXRlbWFuYWdlclwiO1xyaW1wb3J0IHtTM09yaWdpbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnNcIjtcclxyZXhwb3J0IGludGVyZmFjZSBDcmVhdGVGdW5jdGlvblByb3BzIHtcciAgc2NvcGU6IFN0YWNrO1xyICBmdW5jdGlvbk5hbWU6IHN0cmluZztcciAgZmlsZVBhdGg6IHN0cmluZztccn1cclxyZXhwb3J0IGNvbnN0IGNyZWF0ZUZ1bmN0aW9uID0gKHByb3BzOiBDcmVhdGVGdW5jdGlvblByb3BzKTogSUZ1bmN0aW9uID0+IHtcciAgY29uc3Qge3Njb3BlLCBmdW5jdGlvbk5hbWUsIGZpbGVQYXRofSA9IHByb3BzXHJcciAgcmV0dXJuIG5ldyBGdW5jdGlvbihzY29wZSwgJ21hcHBpbmdGdW5jdGlvbicsIHtcciAgICBmdW5jdGlvbk5hbWU6IGZ1bmN0aW9uTmFtZSxcciAgICBjb2RlOiBGdW5jdGlvbkNvZGUuZnJvbUZpbGUoe1xyICAgICAgZmlsZVBhdGhcciAgICB9KVxyICB9KVxyfVxyXHJleHBvcnQgaW50ZXJmYWNlIENyZWF0ZURpc3RyaWJ1dGlvblByb3BzIHtcciAgc2NvcGU6IFN0YWNrO1xyICBidWNrZXQ6IElCdWNrZXQ7XHIgIGNlcnRpZmljYXRlOiBJQ2VydGlmaWNhdGU7XHIgIHVybDogc3RyaW5nO1xyICBmdW5jdGlvbkFzc29jaWF0aW9uOiBJRnVuY3Rpb247XHJ9XHJccmV4cG9ydCBjb25zdCBjcmVhdGVEaXN0cmlidXRpb24gPSAocHJvcHM6IENyZWF0ZURpc3RyaWJ1dGlvblByb3BzKTogSURpc3RyaWJ1dGlvbiA9PiB7XHIgIGNvbnN0IHtzY29wZSwgYnVja2V0LCBjZXJ0aWZpY2F0ZSwgdXJsLCBmdW5jdGlvbkFzc29jaWF0aW9ufSA9IHByb3BzXHJcciAgcmV0dXJuIG5ldyBEaXN0cmlidXRpb24oc2NvcGUsICdkaXN0cmlidXRpb24nLCB7XHIgICAgZG9tYWluTmFtZXM6IFt1cmxdLFxyICAgIGRlZmF1bHRCZWhhdmlvcjoge1xyICAgICAgb3JpZ2luOiBuZXcgUzNPcmlnaW4oYnVja2V0KSxcciAgICAgIC8vIGZ1bmN0aW9uQXNzb2NpYXRpb25zOiBbXHIgICAgICAvLyAgIHtcciAgICAgIC8vICAgICBmdW5jdGlvbjogZnVuY3Rpb25Bc3NvY2lhdGlvbixcciAgICAgIC8vICAgICBldmVudFR5cGU6IEZ1bmN0aW9uRXZlbnRUeXBlLlZJRVdFUl9SRVFVRVNUXHIgICAgICAvLyAgIH1cciAgICAgIC8vIF1cciAgICB9LFxyICAgIC8vIGNlcnRpZmljYXRlLFxyICAgIGRlZmF1bHRSb290T2JqZWN0OiAnL2luZGV4Lmh0bWwnLFxyICAgIGVycm9yUmVzcG9uc2VzOiBbXHIgICAgICB7XHIgICAgICAgIGh0dHBTdGF0dXM6IDQwNCxcciAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOiA0MDQsXHIgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvNDA0Lmh0bWwnXHIgICAgICB9XHIgICAgXVxyICB9KVxyfVxyIl19