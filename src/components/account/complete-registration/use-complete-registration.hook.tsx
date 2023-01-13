import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {Auth} from '@aws-amplify/auth'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'
import {useAuth} from '@clubwoof-context'
import {isCognitoError, logUserIn} from '@clubwoof-utils'

export const useCompleteRegistrationHook = (): void => {
  const router = useRouter()
  const {addUserToState} = useAuth()

  useEffect(() => {
    const hasQueryParams = router.query.email && router.query.code
    if (router.isReady && !hasQueryParams) {
      router.push('/')
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
      console.log('hey')
      try {
        await Auth.confirmSignUp(String(router.query.email), String(router.query.code))

        await handleLogin()
      } catch (e) {
        if (isCognitoError(e)) {
          if (e.message.includes('Current status is CONFIRMED')) {
            await handleLogin()
          }
        }
      }
    }

    const handleLogin = async () => {
      const password = localStorage.getItem(TEMP_PWD_LOCALSTORAGE_KEY)
      console.log({password})
      if (password) {
        await logUserIn({
          email: String(router.query.email),
          password,
          addUserToState,
          router,
        })
      } else {
        router.push('/')
      }
    }

    completeRegistration()
  }, [router, addUserToState])
}
