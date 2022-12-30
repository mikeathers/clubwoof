"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class GithubStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const githubDomain = 'token.actions.githubusercontent.com';
        const ghProvider = new aws_iam_1.OpenIdConnectProvider(this, 'githubProvider', {
            url: `https://${githubDomain}`,
            clientIds: ['sts.amazonaws.com'],
        });
        const iamRepoDeployAccess = props?.repositoryConfig.map((r) => `repo:${r.owner}/${r.repo}:${r.filter ?? '*'}`);
        const conditions = {
            StringLike: {
                [`${githubDomain}:sub`]: iamRepoDeployAccess,
            },
        };
        new aws_iam_1.Role(this, 'exampleGitHubDeployRole', {
            assumedBy: new aws_iam_1.WebIdentityPrincipal(ghProvider.openIdConnectProviderArn, conditions),
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
            ],
            roleName: 'exampleGitHubDeployRole',
            description: 'This role is used via GitHub Actions to deploy with AWS CDK or Terraform on the target AWS account',
            maxSessionDuration: aws_cdk_lib_1.Duration.hours(1),
        });
    }
}
exports.GithubStack = GithubStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2l0aHViLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF3RDtBQUV4RCxpREFBaUg7QUFNakgsTUFBYSxXQUFZLFNBQVEsbUJBQUs7SUFDcEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF3QjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUV2QixNQUFNLFlBQVksR0FBRyxxQ0FBcUMsQ0FBQztRQUUzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFxQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNuRSxHQUFHLEVBQUUsV0FBVyxZQUFZLEVBQUU7WUFDOUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUNyRCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FDdEQsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFlO1lBQzdCLFVBQVUsRUFBRTtnQkFDVixDQUFDLEdBQUcsWUFBWSxNQUFNLENBQUMsRUFBRSxtQkFBbUI7YUFDN0M7U0FDRixDQUFDO1FBRUYsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLDhCQUFvQixDQUNqQyxVQUFVLENBQUMsd0JBQXdCLEVBQ25DLFVBQVUsQ0FDWDtZQUNELGVBQWUsRUFBRTtnQkFDZix1QkFBYSxDQUFDLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDO2FBQzlEO1lBQ0QsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxXQUFXLEVBQ1Qsb0dBQW9HO1lBQ3RHLGtCQUFrQixFQUFFLHNCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFFTCxDQUFDO0NBQ0Y7QUFwQ0Qsa0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEdXJhdGlvbiwgU3RhY2ssIFN0YWNrUHJvcHN9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyaW1wb3J0IHtDb25zdHJ1Y3R9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJpbXBvcnQge0NvbmRpdGlvbnMsIE1hbmFnZWRQb2xpY3ksIE9wZW5JZENvbm5lY3RQcm92aWRlciwgUm9sZSwgV2ViSWRlbnRpdHlQcmluY2lwYWx9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtaWFtXCI7XHJccmV4cG9ydCBpbnRlcmZhY2UgR2l0SHViU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xyICByZWFkb25seSByZXBvc2l0b3J5Q29uZmlnOiB7IG93bmVyOiBzdHJpbmc7IHJlcG86IHN0cmluZzsgZmlsdGVyPzogc3RyaW5nIH1bXTtccn1cclxyZXhwb3J0IGNsYXNzIEdpdGh1YlN0YWNrIGV4dGVuZHMgU3RhY2sge1xyICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IEdpdEh1YlN0YWNrUHJvcHMpIHtcciAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKVxyXHIgICAgY29uc3QgZ2l0aHViRG9tYWluID0gJ3Rva2VuLmFjdGlvbnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tJztcclxyICAgIGNvbnN0IGdoUHJvdmlkZXIgPSBuZXcgT3BlbklkQ29ubmVjdFByb3ZpZGVyKHRoaXMsICdnaXRodWJQcm92aWRlcicsIHtcciAgICAgIHVybDogYGh0dHBzOi8vJHtnaXRodWJEb21haW59YCxcciAgICAgIGNsaWVudElkczogWydzdHMuYW1hem9uYXdzLmNvbSddLFxyICAgIH0pO1xyXHIgICAgY29uc3QgaWFtUmVwb0RlcGxveUFjY2VzcyA9IHByb3BzPy5yZXBvc2l0b3J5Q29uZmlnLm1hcChcciAgICAgIChyKSA9PiBgcmVwbzoke3Iub3duZXJ9LyR7ci5yZXBvfToke3IuZmlsdGVyID8/ICcqJ31gXHIgICAgKTtcclxyICAgIGNvbnN0IGNvbmRpdGlvbnM6IENvbmRpdGlvbnMgPSB7XHIgICAgICBTdHJpbmdMaWtlOiB7XHIgICAgICAgIFtgJHtnaXRodWJEb21haW59OnN1YmBdOiBpYW1SZXBvRGVwbG95QWNjZXNzLFxyICAgICAgfSxcciAgICB9O1xyXHIgICAgbmV3IFJvbGUodGhpcywgJ2V4YW1wbGVHaXRIdWJEZXBsb3lSb2xlJywge1xyICAgICAgYXNzdW1lZEJ5OiBuZXcgV2ViSWRlbnRpdHlQcmluY2lwYWwoXHIgICAgICAgIGdoUHJvdmlkZXIub3BlbklkQ29ubmVjdFByb3ZpZGVyQXJuLFxyICAgICAgICBjb25kaXRpb25zXHIgICAgICApLFxyICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXHIgICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBZG1pbmlzdHJhdG9yQWNjZXNzJyksXHIgICAgICBdLFxyICAgICAgcm9sZU5hbWU6ICdleGFtcGxlR2l0SHViRGVwbG95Um9sZScsXHIgICAgICBkZXNjcmlwdGlvbjpcciAgICAgICAgJ1RoaXMgcm9sZSBpcyB1c2VkIHZpYSBHaXRIdWIgQWN0aW9ucyB0byBkZXBsb3kgd2l0aCBBV1MgQ0RLIG9yIFRlcnJhZm9ybSBvbiB0aGUgdGFyZ2V0IEFXUyBhY2NvdW50JyxcciAgICAgIG1heFNlc3Npb25EdXJhdGlvbjogRHVyYXRpb24uaG91cnMoMSksXHIgICAgfSk7XHJcciAgfVxyfSJdfQ==