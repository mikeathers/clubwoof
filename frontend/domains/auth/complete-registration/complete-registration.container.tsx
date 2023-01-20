import {CompleteRegistrationComponent} from './complete-registration.component'
import {useRouter} from 'next/router'
import {useAuth} from '@clubwoof-context'
import {useEffect, useState} from 'react'
import {Auth} from '@aws-amplify/auth'
import {isCognitoError, logUserIn} from '@clubwoof-utils'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'
import {useSafeAsync} from '../../../hooks/use-safe-async'

interface CompleteRegistrationProps {
  i18n: i18nCompleteRegistrationPage
}

export const CompleteRegistration: React.FC<CompleteRegistrationProps> = (props) => {
  const {i18n} = props
  const router = useRouter()
  const {addUserToState} = useAuth()
  const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false)
  const hasQueryParams = router.query.email && router.query.code
  const {run, isError, error, isLoading, isIdle} = useSafeAsync()

  useEffect(() => {
    if (router.isReady && !hasQueryParams) {
      router.push('/auth/resend-confirmation-email')
      return
    }

    const completeRegistration = async () => {
      if (
        typeof router.query.email === 'string' &&
        typeof router.query.code === 'string'
      ) {
        await run(confirmRegistrationAndLogUserIn())
      }
    }

    const confirmRegistrationAndLogUserIn = async () => {
      try {
        await Auth.confirmSignUp(String(router.query.email), String(router.query.code))
        await handleLogin()
      } catch (e) {
        if (isCognitoError(e)) {
          if (e.message.includes('Current status is CONFIRMED')) {
            router.push('/auth/login')
          }
        }
      }
    }

    const handleLogin = async () => {
      const password = localStorage.getItem(TEMP_PWD_LOCALSTORAGE_KEY)
      if (password) {
        const user = await logUserIn({
          email: String(router.query.email),
          password,
          addUserToState,
          router,
          goToDashboard: false,
        })
        if (user) {
          setLoginSuccessful(true)
        }
      } else {
        router.push('/auth/login')
      }
    }

    completeRegistration()
  }, [])

  return (
    <CompleteRegistrationComponent
      i18n={i18n}
      loginSuccessful={loginSuccessful}
      isError={isError}
      error={error}
      isLoading={isLoading}
      isIdle={isIdle}
    />
  )
}
