"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3_1 = require("./aws/s3");
const route53_1 = require("./aws/route53");
const certificate_1 = require("./aws/certificate");
const cloudfront_1 = require("./aws/cloudfront");
const config_1 = require("../config");
const path_1 = require("path");
class StaticWebsiteStack extends aws_cdk_lib_1.Stack {
    constructor(scope, props) {
        super(scope, 'staticWebsite', props);
        const { url, domainName, subDomainName } = props;
        // Let's create somewhere to store our static website content
        // For that we can use an S3 bucket
        const bucket = (0, s3_1.createBucket)({
            scope: this,
            bucketName: url
        });
        new aws_cdk_lib_1.CfnOutput(this, 'clubwoofWebS3Url', {
            value: bucket.bucketWebsiteUrl
        });
        // Next lets lookup and grab a reference to our hosted zone in Route53
        const hostedZone = (0, route53_1.getHostedZone)({
            scope: this,
            domainName
        });
        // Now we want to create an SSL certificate for our url under the hosted
        // zone we just grabbed a reference to
        // This will allow us to securely server content from our CloudFront Distribution
        const certificate = (0, certificate_1.createCertificate)({
            scope: this,
            hostedZone,
            url
        });
        // Now let's create our mapping function. This runs on CloudFront at the edge
        // on a defined path
        // This allows us to ensure pages are mapped to their correct html files when
        // the Next.js library isn't loaded on the client
        const functionAssociation = (0, cloudfront_1.createFunction)({
            scope: this,
            functionName: `mapping-${config_1.default.STACK_PREFIX}`,
            filePath: (0, path_1.join)(__dirname, 'functions', 'mapping-function', 'index.js')
        });
        // With those few components now created we can now create our CloudFront
        // distribution
        // This allows for our static website content to be propogated across a CDN
        // geographically closer to our users
        const distribution = (0, cloudfront_1.createDistribution)({
            scope: this,
            bucket,
            certificate,
            url,
            functionAssociation
        });
        new aws_cdk_lib_1.CfnOutput(this, 'clubwoofWebAppCloudFrontUrl', {
            value: distribution.distributionDomainName
        });
        // Create an A record entry in Route53 that points to our CloudFront distribution
        // E.g. nextjs-serverless-static-site.tylangesmith.com ==> xyz.cloudfront.net
        (0, route53_1.createARecordForDistribution)({
            scope: this,
            hostedZone,
            subDomainName,
            distribution
        });
        // Finally let's deploy our static content to our S3 bucket
        const deployment = (0, s3_1.createBucketDeployment)({
            scope: this,
            bucket,
            distribution,
            filePath: './out'
        });
        new aws_cdk_lib_1.CfnOutput(this, 'clubwoofUrl', {
            value: deployment.deployedBucket.bucketWebsiteUrl
        });
    }
}
exports.default = StaticWebsiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXdlYnNpdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtd2Vic2l0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4RDtBQUM5RCxpQ0FBOEQ7QUFDOUQsMkNBQTBFO0FBQzFFLG1EQUFvRDtBQUNwRCxpREFBb0U7QUFDcEUsc0NBQStCO0FBQy9CLCtCQUEwQjtBQVExQixNQUFxQixrQkFBbUIsU0FBUSxtQkFBSztJQUNuRCxZQUFZLEtBQVUsRUFBRSxLQUFZO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3BDLE1BQU0sRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBQyxHQUFHLEtBQUssQ0FBQTtRQUU5Qyw2REFBNkQ7UUFDN0QsbUNBQW1DO1FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUEsaUJBQVksRUFBQztZQUMxQixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQTtRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsc0VBQXNFO1FBQ3RFLE1BQU0sVUFBVSxHQUFHLElBQUEsdUJBQWEsRUFBQztZQUMvQixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVU7U0FDWCxDQUFDLENBQUE7UUFFRix3RUFBd0U7UUFDeEUsc0NBQXNDO1FBQ3RDLGlGQUFpRjtRQUNqRixNQUFNLFdBQVcsR0FBRyxJQUFBLCtCQUFpQixFQUFDO1lBQ3BDLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVTtZQUNWLEdBQUc7U0FDSixDQUFDLENBQUE7UUFFRiw2RUFBNkU7UUFDN0Usb0JBQW9CO1FBQ3BCLDZFQUE2RTtRQUM3RSxpREFBaUQ7UUFDakQsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLDJCQUFjLEVBQUM7WUFDekMsS0FBSyxFQUFFLElBQUk7WUFDWCxZQUFZLEVBQUUsV0FBVyxnQkFBTSxDQUFDLFlBQVksRUFBRTtZQUM5QyxRQUFRLEVBQUUsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLENBQUM7U0FDdkUsQ0FBQyxDQUFBO1FBRUYseUVBQXlFO1FBQ3pFLGVBQWU7UUFDZiwyRUFBMkU7UUFDM0UscUNBQXFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLElBQUEsK0JBQWtCLEVBQUM7WUFDdEMsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNO1lBQ04sV0FBVztZQUNYLEdBQUc7WUFDSCxtQkFBbUI7U0FDcEIsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRTtZQUNqRCxLQUFLLEVBQUUsWUFBWSxDQUFDLHNCQUFzQjtTQUMzQyxDQUFDLENBQUE7UUFFRixpRkFBaUY7UUFDakYsNkVBQTZFO1FBQzdFLElBQUEsc0NBQTRCLEVBQUM7WUFDM0IsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVO1lBQ1YsYUFBYTtZQUNiLFlBQVk7U0FDYixDQUFDLENBQUE7UUFFRiwyREFBMkQ7UUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBQSwyQkFBc0IsRUFBQztZQUN4QyxLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU07WUFDTixZQUFZO1lBQ1osUUFBUSxFQUFFLE9BQU87U0FDbEIsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO1NBQ2xELENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTlFRCxxQ0E4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcCwgQ2ZuT3V0cHV0LCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSBcImF3cy1jZGstbGliXCI7XHJpbXBvcnQge2NyZWF0ZUJ1Y2tldCwgY3JlYXRlQnVja2V0RGVwbG95bWVudH0gZnJvbSBcIi4vYXdzL3MzXCI7XHJpbXBvcnQge2NyZWF0ZUFSZWNvcmRGb3JEaXN0cmlidXRpb24sIGdldEhvc3RlZFpvbmV9IGZyb20gXCIuL2F3cy9yb3V0ZTUzXCI7XHJpbXBvcnQge2NyZWF0ZUNlcnRpZmljYXRlfSBmcm9tIFwiLi9hd3MvY2VydGlmaWNhdGVcIjtccmltcG9ydCB7Y3JlYXRlRGlzdHJpYnV0aW9uLCBjcmVhdGVGdW5jdGlvbn0gZnJvbSBcIi4vYXdzL2Nsb3VkZnJvbnRcIjtccmltcG9ydCBDT05GSUcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xyaW1wb3J0IHtqb2lufSBmcm9tIFwicGF0aFwiO1xyXHJleHBvcnQgaW50ZXJmYWNlIFByb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XHIgIHVybDogc3RyaW5nO1xyICBkb21haW5OYW1lOiBzdHJpbmc7XHIgIHN1YkRvbWFpbk5hbWU6IHN0cmluZ1xyfVxyXHJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNXZWJzaXRlU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHIgIGNvbnN0cnVjdG9yKHNjb3BlOiBBcHAsIHByb3BzOiBQcm9wcykge1xyICAgIHN1cGVyKHNjb3BlLCAnc3RhdGljV2Vic2l0ZScsIHByb3BzKVxyICAgIGNvbnN0IHt1cmwsIGRvbWFpbk5hbWUsIHN1YkRvbWFpbk5hbWV9ID0gcHJvcHNcclxyICAgIC8vIExldCdzIGNyZWF0ZSBzb21ld2hlcmUgdG8gc3RvcmUgb3VyIHN0YXRpYyB3ZWJzaXRlIGNvbnRlbnRcciAgICAvLyBGb3IgdGhhdCB3ZSBjYW4gdXNlIGFuIFMzIGJ1Y2tldFxyICAgIGNvbnN0IGJ1Y2tldCA9IGNyZWF0ZUJ1Y2tldCh7XHIgICAgICBzY29wZTogdGhpcyxcciAgICAgIGJ1Y2tldE5hbWU6IHVybFxyICAgIH0pXHJcciAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdjbHVid29vZldlYlMzVXJsJywge1xyICAgICAgdmFsdWU6IGJ1Y2tldC5idWNrZXRXZWJzaXRlVXJsXHIgICAgfSk7XHJcciAgICAvLyBOZXh0IGxldHMgbG9va3VwIGFuZCBncmFiIGEgcmVmZXJlbmNlIHRvIG91ciBob3N0ZWQgem9uZSBpbiBSb3V0ZTUzXHIgICAgY29uc3QgaG9zdGVkWm9uZSA9IGdldEhvc3RlZFpvbmUoe1xyICAgICAgc2NvcGU6IHRoaXMsXHIgICAgICBkb21haW5OYW1lXHIgICAgfSlcclxyICAgIC8vIE5vdyB3ZSB3YW50IHRvIGNyZWF0ZSBhbiBTU0wgY2VydGlmaWNhdGUgZm9yIG91ciB1cmwgdW5kZXIgdGhlIGhvc3RlZFxyICAgIC8vIHpvbmUgd2UganVzdCBncmFiYmVkIGEgcmVmZXJlbmNlIHRvXHIgICAgLy8gVGhpcyB3aWxsIGFsbG93IHVzIHRvIHNlY3VyZWx5IHNlcnZlciBjb250ZW50IGZyb20gb3VyIENsb3VkRnJvbnQgRGlzdHJpYnV0aW9uXHIgICAgY29uc3QgY2VydGlmaWNhdGUgPSBjcmVhdGVDZXJ0aWZpY2F0ZSh7XHIgICAgICBzY29wZTogdGhpcyxcciAgICAgIGhvc3RlZFpvbmUsXHIgICAgICB1cmxcciAgICB9KVxyXHIgICAgLy8gTm93IGxldCdzIGNyZWF0ZSBvdXIgbWFwcGluZyBmdW5jdGlvbi4gVGhpcyBydW5zIG9uIENsb3VkRnJvbnQgYXQgdGhlIGVkZ2VcciAgICAvLyBvbiBhIGRlZmluZWQgcGF0aFxyICAgIC8vIFRoaXMgYWxsb3dzIHVzIHRvIGVuc3VyZSBwYWdlcyBhcmUgbWFwcGVkIHRvIHRoZWlyIGNvcnJlY3QgaHRtbCBmaWxlcyB3aGVuXHIgICAgLy8gdGhlIE5leHQuanMgbGlicmFyeSBpc24ndCBsb2FkZWQgb24gdGhlIGNsaWVudFxyICAgIGNvbnN0IGZ1bmN0aW9uQXNzb2NpYXRpb24gPSBjcmVhdGVGdW5jdGlvbih7XHIgICAgICBzY29wZTogdGhpcyxcciAgICAgIGZ1bmN0aW9uTmFtZTogYG1hcHBpbmctJHtDT05GSUcuU1RBQ0tfUFJFRklYfWAsXHIgICAgICBmaWxlUGF0aDogam9pbihfX2Rpcm5hbWUsICdmdW5jdGlvbnMnLCAnbWFwcGluZy1mdW5jdGlvbicsICdpbmRleC5qcycpXHIgICAgfSlcclxyICAgIC8vIFdpdGggdGhvc2UgZmV3IGNvbXBvbmVudHMgbm93IGNyZWF0ZWQgd2UgY2FuIG5vdyBjcmVhdGUgb3VyIENsb3VkRnJvbnRcciAgICAvLyBkaXN0cmlidXRpb25cciAgICAvLyBUaGlzIGFsbG93cyBmb3Igb3VyIHN0YXRpYyB3ZWJzaXRlIGNvbnRlbnQgdG8gYmUgcHJvcG9nYXRlZCBhY3Jvc3MgYSBDRE5cciAgICAvLyBnZW9ncmFwaGljYWxseSBjbG9zZXIgdG8gb3VyIHVzZXJzXHIgICAgY29uc3QgZGlzdHJpYnV0aW9uID0gY3JlYXRlRGlzdHJpYnV0aW9uKHtcciAgICAgIHNjb3BlOiB0aGlzLFxyICAgICAgYnVja2V0LFxyICAgICAgY2VydGlmaWNhdGUsXHIgICAgICB1cmwsXHIgICAgICBmdW5jdGlvbkFzc29jaWF0aW9uXHIgICAgfSlcclxyICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ2NsdWJ3b29mV2ViQXBwQ2xvdWRGcm9udFVybCcsIHtcciAgICAgIHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZVxyICAgIH0pXHJcciAgICAvLyBDcmVhdGUgYW4gQSByZWNvcmQgZW50cnkgaW4gUm91dGU1MyB0aGF0IHBvaW50cyB0byBvdXIgQ2xvdWRGcm9udCBkaXN0cmlidXRpb25cciAgICAvLyBFLmcuIG5leHRqcy1zZXJ2ZXJsZXNzLXN0YXRpYy1zaXRlLnR5bGFuZ2VzbWl0aC5jb20gPT0+IHh5ei5jbG91ZGZyb250Lm5ldFxyICAgIGNyZWF0ZUFSZWNvcmRGb3JEaXN0cmlidXRpb24oe1xyICAgICAgc2NvcGU6IHRoaXMsXHIgICAgICBob3N0ZWRab25lLFxyICAgICAgc3ViRG9tYWluTmFtZSxcciAgICAgIGRpc3RyaWJ1dGlvblxyICAgIH0pXHJcciAgICAvLyBGaW5hbGx5IGxldCdzIGRlcGxveSBvdXIgc3RhdGljIGNvbnRlbnQgdG8gb3VyIFMzIGJ1Y2tldFxyICAgIGNvbnN0IGRlcGxveW1lbnQgPSBjcmVhdGVCdWNrZXREZXBsb3ltZW50KHtcciAgICAgIHNjb3BlOiB0aGlzLFxyICAgICAgYnVja2V0LFxyICAgICAgZGlzdHJpYnV0aW9uLFxyICAgICAgZmlsZVBhdGg6ICcuL291dCdcciAgICB9KVxyXHIgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnY2x1Yndvb2ZVcmwnLCB7XHIgICAgICB2YWx1ZTogZGVwbG95bWVudC5kZXBsb3llZEJ1Y2tldC5idWNrZXRXZWJzaXRlVXJsXHIgICAgfSlcciAgfVxyfSJdfQ==