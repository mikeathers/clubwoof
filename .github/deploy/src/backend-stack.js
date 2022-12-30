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
        console.log(process.env.SUBDOMAIN_NAME);
        console.log(process.env.BRANCH_NAME);
        console.log(process.env.GITHUB_REPOSITORY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQXdEO0FBRXhELHVDQUEyRjtBQUUzRixNQUFhLFlBQWEsU0FBUSxtQkFBSztJQUNyQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxJQUFJLDJCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlDLE1BQU0sRUFBQyxjQUFjLEVBQUMsR0FBRyxJQUFJLGlDQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwRSxNQUFNLEVBQUMsWUFBWSxFQUFDLEdBQUcsSUFBSSwrQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBRWhGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFFMUMsVUFBVTtRQUNWLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2hDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxjQUFjLENBQUMsZ0JBQWdCO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDcEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxHQUFHO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzVCLEtBQUssRUFBRSxtQkFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO1NBQzdCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTdCRCxvQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnN0cnVjdH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCB7Q2ZuT3V0cHV0LCBTdGFjaywgU3RhY2tQcm9wc30gZnJvbSAnYXdzLWNkay1saWInXG5cbmltcG9ydCB7SWRlbnRpdHlQb29sQ29uc3RydWN0LCBVc2VyUG9vbENsaWVudENvbnN0cnVjdCwgVXNlclBvb2xDb25zdHJ1Y3R9IGZyb20gJy4vY29nbml0bydcblxuZXhwb3J0IGNsYXNzIEJhY2tlbmRTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcylcblxuICAgIGNvbnN0IHt1c2VyUG9vbH0gPSBuZXcgVXNlclBvb2xDb25zdHJ1Y3QodGhpcylcbiAgICBjb25zdCB7dXNlclBvb2xDbGllbnR9ID0gbmV3IFVzZXJQb29sQ2xpZW50Q29uc3RydWN0KHRoaXMsIHVzZXJQb29sKVxuICAgIGNvbnN0IHtpZGVudGl0eVBvb2x9ID0gbmV3IElkZW50aXR5UG9vbENvbnN0cnVjdCh0aGlzLCB1c2VyUG9vbCwgdXNlclBvb2xDbGllbnQpXG5cbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5TVUJET01BSU5fTkFNRSlcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5CUkFOQ0hfTkFNRSlcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5HSVRIVUJfUkVQT1NJVE9SWSlcblxuICAgIC8vIE91dHB1dHNcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICd1c2VyUG9vbElkJywge1xuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgfSlcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ3VzZXJQb29sQ2xpZW50SWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICB9KVxuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnaWRlbnRpdHlQb29sSWQnLCB7XG4gICAgICB2YWx1ZTogaWRlbnRpdHlQb29sLnJlZixcbiAgICB9KVxuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAncmVnaW9uJywge1xuICAgICAgdmFsdWU6IFN0YWNrLm9mKHRoaXMpLnJlZ2lvbixcbiAgICB9KVxuICB9XG59XG4iXX0=