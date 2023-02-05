import {Auth, CognitoUser} from '@aws-amplify/auth'

export const getUserInfo = async (): Promise<CognitoUser> => {
  // eslint-disable-next-line no-useless-catch
  try {
    return (await Auth.currentUserInfo()) as CognitoUser
  } catch (err) {
    throw err
  }
}
