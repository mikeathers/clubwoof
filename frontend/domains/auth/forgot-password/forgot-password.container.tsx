import {Auth} from '@aws-amplify/auth'
import {useSafeAsync} from '@clubwoof-hooks'
import {withAuthenticatedRedirect} from '@clubwoof-hoc'
import {ForgotPasswordComponent} from './forgot-password.component'

interface ForgotPasswordProps {
  i18n: i18nForgotPasswordPage
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const {i18n} = props
  const {error, resetAsyncState, run, isSuccess, isLoading} = useSafeAsync()

  const handleClearError = () => {
    if (error !== undefined) {
      resetAsyncState()
    }
  }

  const sendForgotPasswordLink = async (data: FormDetails) => {
    if (data.email) {
      await run(Auth.forgotPassword(data.email))
    }
  }

  return (
    <ForgotPasswordComponent
      i18n={i18n}
      error={error?.message}
      linkSentSuccessfully={isSuccess}
      clearErrors={handleClearError}
      sendForgotPasswordLink={sendForgotPasswordLink}
      isLoading={isLoading}
    />
  )
}
export default withAuthenticatedRedirect(ForgotPassword)
