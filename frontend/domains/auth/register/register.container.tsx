import {Auth} from '@aws-amplify/auth'

import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'
import {useSafeAsync} from '@clubwoof-hooks'
import {withAuthenticatedRedirect} from '@clubwoof-hoc'

import {RegisterComponent} from './register.component'

interface RegisterProps {
  i18n: i18nRegisterPage
}

export const Register: React.FC<RegisterProps> = (props) => {
  const {i18n} = props
  const {run, error, isLoading, isSuccess} = useSafeAsync()

  const onSubmit = async (data: FormDetails) => {
    await run(registerUser(data))
  }

  const registerUser = async (data: FormDetails) => {
    if (data.firstName && data.lastName && data.email && data.password) {
      const result = await Auth.signUp({
        username: data.email.trim().toLowerCase(),
        password: data.password,
        attributes: {
          given_name: data.firstName.trim().toLowerCase(),
          family_name: data.lastName.trim().toLowerCase(),
        },
      })
      console.log(result)

      localStorage.setItem(TEMP_PWD_LOCALSTORAGE_KEY, data.password)
      window.scrollTo(0, 0)
    }
  }

  return (
    <RegisterComponent
      error={error}
      registrationComplete={isSuccess}
      i18n={i18n}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  )
}

export default withAuthenticatedRedirect(Register)
