import {NextRouter} from 'next/router'
import {Auth, CognitoUser} from '@aws-amplify/auth'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

interface LoginProps {
  email: string
  password: string
  router: NextRouter
  addUserToState: () => Promise<void>
}

interface UserAttributes {
  // eslint-disable-next-line camelcase
  given_name?: string
  // eslint-disable-next-line camelcase
  family_name?: string
}

interface User extends CognitoUser {
  challengeName?: string
  challengeParam: {
    requiredAttributes: string
  }
}
export const logUserIn = async (props: LoginProps): Promise<User> => {
  const {email, password, router, addUserToState} = props
  localStorage.removeItem(TEMP_PWD_LOCALSTORAGE_KEY)

  const user = (await Auth.signIn(email, password)) as User
  console.log(user)
  if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    const {requiredAttributes} = user.challengeParam
    const userAttributes: UserAttributes = {}

    if (requiredAttributes.includes('given_name')) {
      userAttributes.given_name = 'Test'
    }

    if (requiredAttributes.includes('family_name')) {
      userAttributes.family_name = 'User'
    }

    await Auth.completeNewPassword(user, password, userAttributes)
  }

  addUserToState()

  router.push('/')

  return user
}
