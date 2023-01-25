import {ResendRegistrationLinkComponent} from './resend-registration-link.component'
import {useSafeAsync} from '@clubwoof-hooks'
import {Auth} from '@aws-amplify/auth'

interface ResendRegistrationLinkProps {
  i18n: i18nResendRegistrationLink
}

export const ResendRegistrationLink: React.FC<ResendRegistrationLinkProps> = (props) => {
  const {i18n} = props
  const {error, resetAsyncState, run, isSuccess} = useSafeAsync()

  const handleClearError = () => {
    if (error !== undefined) {
      resetAsyncState()
    }
  }

  const resendRegistrationLink = async (data: FormDetails) => {
    if (data.email) {
      await run(Auth.resendSignUp(data.email))
    }
  }

  return (
    <ResendRegistrationLinkComponent
      i18n={i18n}
      clearErrors={handleClearError}
      resendRegistrationLink={resendRegistrationLink}
      error={error?.message}
      linkSentSuccessfully={isSuccess}
    />
  )
}
