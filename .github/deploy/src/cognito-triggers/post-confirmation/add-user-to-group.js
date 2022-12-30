"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToGroup = void 0;
const aws_sdk_1 = require("aws-sdk");
function addUserToGroup({ userPoolId, username, groupName, }) {
    const params = {
        GroupName: groupName,
        UserPoolId: userPoolId,
        Username: username,
    };
    const cognitoIdp = new aws_sdk_1.CognitoIdentityServiceProvider();
    return cognitoIdp.adminAddUserToGroup(params).promise();
}
exports.addUserToGroup = addUserToGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXVzZXItdG8tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGQtdXNlci10by1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBNEU7QUFFNUUsU0FBZ0IsY0FBYyxDQUFDLEVBQzdCLFVBQVUsRUFDVixRQUFRLEVBQ1IsU0FBUyxHQUtWO0lBR0MsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTLEVBQUUsU0FBUztRQUNwQixVQUFVLEVBQUUsVUFBVTtRQUN0QixRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSx3Q0FBOEIsRUFBRSxDQUFBO0lBQ3ZELE9BQU8sVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ3pELENBQUM7QUFuQkQsd0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVdTRXJyb3IsIENvZ25pdG9JZGVudGl0eVNlcnZpY2VQcm92aWRlciwgUmVzcG9uc2UgfSBmcm9tICdhd3Mtc2RrJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlclRvR3JvdXAoe1xuICB1c2VyUG9vbElkLFxuICB1c2VybmFtZSxcbiAgZ3JvdXBOYW1lLFxufToge1xuICB1c2VyUG9vbElkOiBzdHJpbmdcbiAgdXNlcm5hbWU6IHN0cmluZ1xuICBncm91cE5hbWU6IHN0cmluZ1xufSk6IFByb21pc2U8e1xuICAkcmVzcG9uc2U6IFJlc3BvbnNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIEFXU0Vycm9yPlxufT4ge1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgR3JvdXBOYW1lOiBncm91cE5hbWUsXG4gICAgVXNlclBvb2xJZDogdXNlclBvb2xJZCxcbiAgICBVc2VybmFtZTogdXNlcm5hbWUsXG4gIH1cblxuICBjb25zdCBjb2duaXRvSWRwID0gbmV3IENvZ25pdG9JZGVudGl0eVNlcnZpY2VQcm92aWRlcigpXG4gIHJldHVybiBjb2duaXRvSWRwLmFkbWluQWRkVXNlclRvR3JvdXAocGFyYW1zKS5wcm9taXNlKClcbn1cbiJdfQ==