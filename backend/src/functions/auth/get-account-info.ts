import {Auth, CognitoUser} from '@aws-amplify/auth'

export const getAccountInfo = async (): Promise<CognitoUser> => {
  // eslint-disable-next-line no-useless-catch
  try {
    return (await Auth.currentUserInfo()) as CognitoUser
  } catch (err) {
    throw err
  }
}
