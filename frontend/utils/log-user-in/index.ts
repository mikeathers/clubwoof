import {NextRouter} from 'next/router'
import {Auth, CognitoUser} from '@aws-amplify/auth'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

interface LoginProps {
  email: string
  password: string
  router: NextRouter
  addUserToState: () => Promise<void>
  goToDashboard?: boolean
  isPasswordChange?: boolean
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
  const {email, password, router, addUserToState, goToDashboard, isPasswordChange} = props
  localStorage.removeItem(TEMP_PWD_LOCALSTORAGE_KEY)
  const user = (await Auth.signIn(email, password)) as User

  console.log('user: ', user)

  Auth.currentSession().then((res) => {
    const accessToken = res.getAccessToken()
    const jwt = accessToken.getJwtToken()
    console.log('session: ', res)
    //You can print them to see the full objects
    console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
    console.log(`myJwt: ${jwt}`)
  })

  if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    const {requiredAttributes} = user.challengeParam
    const userAttributes: UserAttributes = {}

    if (requiredAttributes.includes('given_name')) {
      userAttributes.given_name = 'Test'
    }

    if (requiredAttributes.includes('family_name')) {
      userAttributes.family_name = 'User'
    }

    if (isPasswordChange) {
      await Auth.completeNewPassword(user, password, userAttributes)
    }
  }

  addUserToState()

  if (goToDashboard) {
    router.push('/welcome')
  }

  return user
}
