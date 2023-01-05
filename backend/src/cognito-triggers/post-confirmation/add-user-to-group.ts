import {AWSError, CognitoIdentityServiceProvider, Response} from 'aws-sdk'

export function addUserToGroup({
  userPoolId,
  username,
  groupName,
}: {
  userPoolId: string
  username: string
  groupName: string
}): Promise<{
  $response: Response<Record<string, string>, AWSError>
}> {
  const params = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: username,
  }

  const cognitoIdp = new CognitoIdentityServiceProvider()
  return cognitoIdp.adminAddUserToGroup(params).promise()
}
