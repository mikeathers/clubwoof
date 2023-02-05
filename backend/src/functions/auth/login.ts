import {Auth, CognitoUser} from '@aws-amplify/auth'

interface LoginProps {
  email: string
  password: string
}

export const login = async (props: LoginProps): Promise<CognitoUser> => {
  const {email, password} = props
  // eslint-disable-next-line no-useless-catch
  try {
    return (await Auth.signIn({
      username: email,
      password,
    })) as CognitoUser
  } catch (err) {
    throw err
  }
}
