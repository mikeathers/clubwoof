import {LoginComponent} from './login.component'
import {useSafeAsync} from '../../../hooks/use-safe-async'
import {logUserIn} from '@clubwoof-utils'
import {useRouter} from 'next/router'
import {useAuth} from '@clubwoof-context'
import {FormDetails} from '../register'

interface LoginProps {
  i18n: i18nLoginPage
}

export const Login: React.FC<LoginProps> = (props) => {
  const {i18n} = props

  const {run, error, isLoading, resetAsyncState} = useSafeAsync()
  const router = useRouter()
  const {addUserToState} = useAuth()

  const loginUser = (data: FormDetails) => {
    console.log('here')
    if (data.email && data.password) {
      run(
        logUserIn({
          email: data.email,
          password: data.password,
          router,
          addUserToState,
          goToDashboard: true,
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
      resetState={resetAsyncState}
    />
  )
}
