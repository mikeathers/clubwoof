import {CompleteRegistrationComponent} from './complete-registration.component'
import {useRouter} from 'next/router'
import {useAuth} from '@clubwoof-context'
import {useEffect, useState} from 'react'
import {Auth} from '@aws-amplify/auth'
import {isCognitoError, logUserIn} from '@clubwoof-utils'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

export const CompleteRegistration: React.FC = () => {
  const router = useRouter()
  const {addUserToState} = useAuth()
  const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false)

  useEffect(() => {
    const hasQueryParams = router.query.email && router.query.code
    if (router.isReady && !hasQueryParams) {
      router.push('/resend-confirmation-email')
    }

    const completeRegistration = async () => {
      if (
        typeof router.query.email === 'string' &&
        typeof router.query.code === 'string'
      ) {
        await confirmRegistrationAndLogUserIn()
      }
    }

    const confirmRegistrationAndLogUserIn = async () => {
      console.log('here')
      try {
        await Auth.confirmSignUp(String(router.query.email), String(router.query.code))
        await handleLogin()
      } catch (e) {
        console.log({e})
        if (isCognitoError(e)) {
          if (e.message.includes('Current status is CONFIRMED')) {
            await handleLogin()
          }
        }
      }
    }

    const handleLogin = async () => {
      console.log('here 2')
      const password = localStorage.getItem(TEMP_PWD_LOCALSTORAGE_KEY)
      console.log({password})
      if (password) {
        const user = await logUserIn({
          email: String(router.query.email),
          password,
          addUserToState,
          router,
          goToDashboard: false,
        })
        console.log(user)
        if (user) {
          setLoginSuccessful(true)
        }
      } else {
        router.push('/login')
      }
    }

    completeRegistration()
  }, [router, addUserToState])

  return <CompleteRegistrationComponent loginSuccessful={loginSuccessful} />
}
