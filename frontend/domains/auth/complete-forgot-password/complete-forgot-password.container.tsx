import {CompleteForgotPasswordComponent} from './complete-forgot-password.component'
import {useSafeAsync} from '@clubwoof-hooks'
import {Auth} from '@aws-amplify/auth'
import {useRouter} from 'next/router'
import {useAuth} from '@clubwoof-context'
import {useEffect} from 'react'
import {ROUTE_PATHS} from '@clubwoof-constants'
import {logUserIn} from '@clubwoof-utils'
import {withAuthenticatedRedirect} from '@clubwoof-hoc'

export interface CompleteForgotPasswordProps {
  i18n: i18nCompleteForgotPasswordPage
}

export const CompleteForgotPassword: React.FC<CompleteForgotPasswordProps> = (props) => {
  const {i18n} = props
  const router = useRouter()
  const {run, error, resetAsyncState, isLoading} = useSafeAsync()
  const {addUserToState} = useAuth()

  useEffect(() => {
    const hasQueryParameters = router.query.code && router.query.email

    if (router.isReady) {
      if (!hasQueryParameters) {
        router.push(ROUTE_PATHS.FORGOT_PASSWORD)
      }
    }
  }, [])

  const handleClearError = () => {
    if (error !== undefined) {
      resetAsyncState()
    }
  }

  const handleUpdatePassword = (data: FormDetails) => {
    console.log('HERE')
    const updatePassword = async () => {
      const email = String(router.query.email)
      const code = String(router.query.code)
      const password = data.password
      if (password) {
        await Auth.forgotPasswordSubmit(email, code, password)

        await logUserIn({
          email,
          password,
          router,
          addUserToState,
          goToDashboard: true,
        })
      }
    }

    run(updatePassword())
  }

  return (
    <CompleteForgotPasswordComponent
      i18n={i18n}
      error={error?.message}
      isLoading={isLoading}
      clearErrors={handleClearError}
      updatePassword={handleUpdatePassword}
    />
  )
}

export default withAuthenticatedRedirect(CompleteForgotPassword)
