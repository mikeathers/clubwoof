import {useRouter} from 'next/router'

import {useAuth} from '@clubwoof-context'
import {logUserIn} from '@clubwoof-utils'
import {useSafeAsync} from '@clubwoof-hooks'

import {LoginComponent} from './login.component'
import {withAuthenticatedRedirect} from '@clubwoof-hoc'

interface LoginProps {
  i18n: i18nLoginPage
}

export const Login: React.FC<LoginProps> = (props) => {
  const {i18n} = props

  const {run, error, isLoading, resetAsyncState} = useSafeAsync()
  const router = useRouter()
  const {addUserToState} = useAuth()

  const handleClearError = () => {
    if (error !== undefined) {
      resetAsyncState()
    }
  }

  const loginUser = (data: FormDetails) => {
    if (data.email && data.password) {
      run(
        logUserIn({
          email: data.email,
          password: data.password,
          router,
          addUserToState,
          goToDashboard: false,
        }),
      )
    }
  }

  return (
    <LoginComponent
      i18n={i18n}
      loginUser={loginUser}
      error={error?.message}
      isLoading={isLoading}
      clearErrors={handleClearError}
    />
  )
}

export default withAuthenticatedRedirect(Login)
