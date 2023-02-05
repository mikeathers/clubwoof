import {Auth} from '@aws-amplify/auth'
import {ISignUpResult} from 'amazon-cognito-identity-js'

interface RegisterProps {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const register = async (props: RegisterProps): Promise<ISignUpResult> => {
  const {email, password, firstName, lastName} = props
  // eslint-disable-next-line no-useless-catch
  try {
    return await Auth.signUp({
      username: email.trim().toLowerCase(),
      password,
      attributes: {
        given_name: firstName.trim().toLowerCase(),
        family_name: lastName.trim().toLowerCase(),
      },
    })
  } catch (err) {
    throw err
  }
}
