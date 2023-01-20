import {useState} from 'react'
import {Auth} from '@aws-amplify/auth'
import {FieldValues} from 'react-hook-form'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

import {RegisterComponent} from './register.component'
import {useSafeAsync} from '../../../hooks/use-safe-async'

export interface FormDetails extends FieldValues {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}

interface RegisterProps {
  i18n: i18nRegisterPage
}

export const Register: React.FC<RegisterProps> = (props) => {
  const {i18n} = props
  const {run, error, isLoading} = useSafeAsync()
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false)

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
      setRegistrationComplete(true)
    }
  }

  return (
    <RegisterComponent
      error={error}
      registrationComplete={registrationComplete}
      i18n={i18n}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  )
}
