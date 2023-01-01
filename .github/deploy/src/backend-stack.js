"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cognito_1 = require("./cognito");
class BackendStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { userPool } = new cognito_1.UserPoolConstruct(this);
        const { userPoolClient } = new cognito_1.UserPoolClientConstruct(this, userPool);
        const { identityPool } = new cognito_1.IdentityPoolConstruct(this, userPool, userPoolClient);
        // Outputs
        new aws_cdk_lib_1.CfnOutput(this, 'userPoolId', {
            value: userPool.userPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'userPoolClientId', {
            value: userPoolClient.userPoolClientId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'identityPoolId', {
            value: identityPool.ref,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'region', {
            value: aws_cdk_lib_1.Stack.of(this).region,
        });
    }
}
exports.BackendStack = BackendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQTBEO0FBRTFELHVDQUE2RjtBQUU3RixNQUFhLFlBQWEsU0FBUSxtQkFBSztJQUNyQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLDJCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hELE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxJQUFJLGlDQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN0RSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSwrQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBRWxGLFVBQVU7UUFDVixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNoQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN0QyxLQUFLLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjtTQUN2QyxDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3BDLEtBQUssRUFBRSxZQUFZLENBQUMsR0FBRztTQUN4QixDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUM1QixLQUFLLEVBQUUsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtTQUM3QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF6QkQsb0NBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCB7IENmbk91dHB1dCwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYidcblxuaW1wb3J0IHsgSWRlbnRpdHlQb29sQ29uc3RydWN0LCBVc2VyUG9vbENsaWVudENvbnN0cnVjdCwgVXNlclBvb2xDb25zdHJ1Y3QgfSBmcm9tICcuL2NvZ25pdG8nXG5cbmV4cG9ydCBjbGFzcyBCYWNrZW5kU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cbiAgICBjb25zdCB7IHVzZXJQb29sIH0gPSBuZXcgVXNlclBvb2xDb25zdHJ1Y3QodGhpcylcbiAgICBjb25zdCB7IHVzZXJQb29sQ2xpZW50IH0gPSBuZXcgVXNlclBvb2xDbGllbnRDb25zdHJ1Y3QodGhpcywgdXNlclBvb2wpXG4gICAgY29uc3QgeyBpZGVudGl0eVBvb2wgfSA9IG5ldyBJZGVudGl0eVBvb2xDb25zdHJ1Y3QodGhpcywgdXNlclBvb2wsIHVzZXJQb29sQ2xpZW50KVxuXG4gICAgLy8gT3V0cHV0c1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ3VzZXJQb29sSWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICB9KVxuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAndXNlclBvb2xDbGllbnRJZCcsIHtcbiAgICAgIHZhbHVlOiB1c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgIH0pXG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdpZGVudGl0eVBvb2xJZCcsIHtcbiAgICAgIHZhbHVlOiBpZGVudGl0eVBvb2wucmVmLFxuICAgIH0pXG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdyZWdpb24nLCB7XG4gICAgICB2YWx1ZTogU3RhY2sub2YodGhpcykucmVnaW9uLFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==