"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAppDeployment = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
const path_1 = require("path");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const config_1 = require("../config");
class WebAppDeployment {
    constructor(stack) {
        this.stack = stack;
        this.initialize();
    }
    initialize() {
        const bucketName = `${config_1.default.STACK_PREFIX}-web` + config_1.default.STACK_PREFIX;
        this.deploymentBucket = new aws_s3_1.Bucket(this.stack, `${config_1.default.STACK_PREFIX}-bucket`, {
            bucketName: bucketName,
            publicReadAccess: true,
            websiteIndexDocument: 'index.html'
        });
        new aws_s3_deployment_1.BucketDeployment(this.stack, `${config_1.default.STACK_PREFIX}-deployment`, {
            destinationBucket: this.deploymentBucket,
            sources: [
                aws_s3_deployment_1.Source.asset((0, path_1.join)(__dirname, '..', '..', 'out'))
            ]
        });
        new aws_cdk_lib_1.CfnOutput(this.stack, 'clubwoofWebS3Url', {
            value: this.deploymentBucket.bucketWebsiteUrl
        });
        const cloudFront = new aws_cloudfront_1.CloudFrontWebDistribution(this.stack, `${config_1.default.STACK_PREFIX}-web-distribution`, {
            originConfigs: [
                {
                    behaviors: [
                        {
                            isDefaultBehavior: true
                        }
                    ],
                    s3OriginSource: {
                        s3BucketSource: this.deploymentBucket
                    }
                }
            ]
        });
        new aws_cdk_lib_1.CfnOutput(this.stack, 'clubwoofWebAppCloudFrontUrl', {
            value: cloudFront.distributionDomainName
        });
    }
}
exports.WebAppDeployment = WebAppDeployment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWFwcC1kZXBsb3ltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2ViLWFwcC1kZXBsb3ltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2QztBQUM3QywrQ0FBMEM7QUFDMUMscUVBQXVFO0FBQ3ZFLCtCQUEwQjtBQUMxQiwrREFBcUU7QUFDckUsc0NBQStCO0FBRS9CLE1BQWEsZ0JBQWdCO0lBSzNCLFlBQVksS0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFlBQVksTUFBTSxHQUFHLGdCQUFNLENBQUMsWUFBWSxDQUFDO1FBRXRFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQU0sQ0FDaEMsSUFBSSxDQUFDLEtBQUssRUFDVixHQUFHLGdCQUFNLENBQUMsWUFBWSxTQUFTLEVBQUU7WUFDL0IsVUFBVSxFQUFFLFVBQVU7WUFDdEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixvQkFBb0IsRUFBRSxZQUFZO1NBQ25DLENBQ0YsQ0FBQztRQUVGLElBQUksb0NBQWdCLENBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQ1YsR0FBRyxnQkFBTSxDQUFDLFlBQVksYUFBYSxFQUFFO1lBQ25DLGlCQUFpQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDeEMsT0FBTyxFQUFFO2dCQUNQLDBCQUFNLENBQUMsS0FBSyxDQUNWLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUNuQzthQUNGO1NBQ0YsQ0FDRixDQUFDO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7WUFDNUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0I7U0FDOUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSwwQ0FBeUIsQ0FDOUMsSUFBSSxDQUFDLEtBQUssRUFDVixHQUFHLGdCQUFNLENBQUMsWUFBWSxtQkFBbUIsRUFBRTtZQUN6QyxhQUFhLEVBQUU7Z0JBQ2I7b0JBQ0UsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLGlCQUFpQixFQUFFLElBQUk7eUJBQ3hCO3FCQUNGO29CQUNELGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtxQkFDdEM7aUJBQ0Y7YUFDRjtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDZCQUE2QixFQUFFO1lBQ3ZELEtBQUssRUFBRSxVQUFVLENBQUMsc0JBQXNCO1NBQ3pDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTVERCw0Q0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nmbk91dHB1dCwgU3RhY2t9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyaW1wb3J0IHtCdWNrZXR9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczNcIjtccmltcG9ydCB7QnVja2V0RGVwbG95bWVudCwgU291cmNlfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnRcIjtccmltcG9ydCB7am9pbn0gZnJvbSAncGF0aCc7XHJpbXBvcnQge0Nsb3VkRnJvbnRXZWJEaXN0cmlidXRpb259IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udFwiO1xyaW1wb3J0IENPTkZJRyBmcm9tIFwiLi4vY29uZmlnXCI7XHJccmV4cG9ydCBjbGFzcyBXZWJBcHBEZXBsb3ltZW50IHtcciAgcHJpdmF0ZSBzdGFjazogU3RhY2s7XHIgIC8vIEB0cy1pZ25vcmVcciAgcHJpdmF0ZSBkZXBsb3ltZW50QnVja2V0OiBCdWNrZXRcclxyICBjb25zdHJ1Y3RvcihzdGFjazogU3RhY2spIHtcciAgICB0aGlzLnN0YWNrID0gc3RhY2s7XHIgICAgdGhpcy5pbml0aWFsaXplKCk7XHIgIH1cclxyICBwcml2YXRlIGluaXRpYWxpemUoKSB7XHIgICAgY29uc3QgYnVja2V0TmFtZSA9IGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LXdlYmAgKyBDT05GSUcuU1RBQ0tfUFJFRklYO1xyXHIgICAgdGhpcy5kZXBsb3ltZW50QnVja2V0ID0gbmV3IEJ1Y2tldChcciAgICAgIHRoaXMuc3RhY2ssXHIgICAgICBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1idWNrZXRgLCB7XHIgICAgICAgIGJ1Y2tldE5hbWU6IGJ1Y2tldE5hbWUsXHIgICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXHIgICAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCdcciAgICAgIH1cciAgICApO1xyXHIgICAgbmV3IEJ1Y2tldERlcGxveW1lbnQoXHIgICAgICB0aGlzLnN0YWNrLFxyICAgICAgYCR7Q09ORklHLlNUQUNLX1BSRUZJWH0tZGVwbG95bWVudGAsIHtcciAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHRoaXMuZGVwbG95bWVudEJ1Y2tldCxcciAgICAgICAgc291cmNlczogW1xyICAgICAgICAgIFNvdXJjZS5hc3NldChcciAgICAgICAgICAgIGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnb3V0JylcciAgICAgICAgICApXHIgICAgICAgIF1cciAgICAgIH1cciAgICApO1xyXHIgICAgbmV3IENmbk91dHB1dCh0aGlzLnN0YWNrLCAnY2x1Yndvb2ZXZWJTM1VybCcsIHtcciAgICAgIHZhbHVlOiB0aGlzLmRlcGxveW1lbnRCdWNrZXQuYnVja2V0V2Vic2l0ZVVybFxyICAgIH0pO1xyXHIgICAgY29uc3QgY2xvdWRGcm9udCA9IG5ldyBDbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKFxyICAgICAgdGhpcy5zdGFjayxcciAgICAgIGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LXdlYi1kaXN0cmlidXRpb25gLCB7XHIgICAgICAgIG9yaWdpbkNvbmZpZ3M6IFtcciAgICAgICAgICB7XHIgICAgICAgICAgICBiZWhhdmlvcnM6IFtcciAgICAgICAgICAgICAge1xyICAgICAgICAgICAgICAgIGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlXHIgICAgICAgICAgICAgIH1cciAgICAgICAgICAgIF0sXHIgICAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xyICAgICAgICAgICAgICBzM0J1Y2tldFNvdXJjZTogdGhpcy5kZXBsb3ltZW50QnVja2V0XHIgICAgICAgICAgICB9XHIgICAgICAgICAgfVxyICAgICAgICBdXHIgICAgICB9XHIgICAgKTtcclxyICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zdGFjaywgJ2NsdWJ3b29mV2ViQXBwQ2xvdWRGcm9udFVybCcsIHtcciAgICAgIHZhbHVlOiBjbG91ZEZyb250LmRpc3RyaWJ1dGlvbkRvbWFpbk5hbWVcciAgICB9KVxyICB9XHJ9Il19