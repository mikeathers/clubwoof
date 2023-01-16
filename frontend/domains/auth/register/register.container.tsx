import {useState} from 'react'
import {Auth} from '@aws-amplify/auth'
import {FieldValues} from 'react-hook-form'

import {isCognitoError} from '@clubwoof-utils'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

import {RegisterComponent} from './register.component'

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

  const [error, setError] = useState<string>('')
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false)

  const registerUser = async (data: FormDetails) => {
    setError('')
    if (data.firstName && data.lastName && data.email && data.password) {
      try {
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
      } catch (e) {
        if (isCognitoError(e)) {
          console.log(e)
          setError(e.message)
        } else setError(i18n.terribleError)
      }
    }
  }

  return (
    <RegisterComponent
      registerUser={registerUser}
      error={error}
      registrationComplete={registrationComplete}
      i18n={i18n}
    />
  )
}
