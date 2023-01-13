import {KeyboardEvent, SyntheticEvent, useEffect, useState} from 'react'
import {Control, FieldValues, useForm} from 'react-hook-form'
import {Auth} from '@aws-amplify/auth'
import {yupResolver} from '@hookform/resolvers/yup'

import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'
import {isCognitoError} from '@clubwoof-utils'

import {formSchema, inputs} from './form-helpers'

interface FormDetails extends FieldValues {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}
interface useRegisterProps {
  error: string
  control: Control<FormDetails>
  registrationComplete: boolean
  handleSubmitForm: (e: SyntheticEvent) => Promise<void>
  getInputErrorMessage: (inputName: string) => string
  getPasswordFormatValidationMessage: () => string
  handleKeyPress: (e: KeyboardEvent<HTMLElement>, index: number) => void
}
export const useRegisterHook = (): useRegisterProps => {
  const {control, handleSubmit, formState, reset} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  })
  const [error, setError] = useState<string>('')
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false)
  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()

  useEffect(() => {
    addInteractiveFieldsToState()
  }, [])

  const addInteractiveFieldsToState = () => {
    const firstNameInput = document.querySelector(
      '[aria-label="First name"]',
    ) as HTMLInputElement
    const lastNameInput = document.querySelector(
      '[aria-label="Last name"]',
    ) as HTMLInputElement
    const emailInput = document.querySelector('[aria-label="Email"]') as HTMLInputElement
    const passwordInput = document.querySelector(
      '[aria-label="Password"]',
    ) as HTMLInputElement
    const confirmPasswordInput = document.querySelector(
      '[aria-label=" Confirm password"]',
    ) as HTMLInputElement
    const submitButtonElement = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement

    setInputLabels([
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ])
    setSubmitButton(submitButtonElement)
  }

  const handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (Object.keys(formState.errors).length > 0) return

    await handleSubmit(registerUser)()
  }

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
        reset()
      } catch (e) {
        if (isCognitoError(e)) {
          console.log(e)
          setError(e.message)
        } else setError('Something has gone very wrong, please try again later.')
      }
    }
  }

  const getInputErrorMessage = (inputName: string) => {
    const errorMessage = formState.errors[inputName]?.message
    if (!errorMessage) return ''
    return (errorMessage as string).includes('contain') ? '' : `${errorMessage}`
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter') {
      if (index < inputs.length) {
        const input = inputLabels[index]
        if (input) {
          input.focus()
        }
      }
      if (index === inputs.length) {
        if (submitButton) {
          submitButton.focus()
        }
      }
    }
  }

  const getPasswordFormatValidationMessage = () => {
    const {errors} = formState
    if (Object.keys(errors).length === 0) return ''
    const errorMessage = `${errors['password']?.message}`
    if (!errorMessage) return ''
    if (errorMessage && errorMessage.includes('contain')) return errorMessage
    return ''
  }

  return {
    error,
    control,
    registrationComplete,
    handleSubmitForm,
    getInputErrorMessage,
    getPasswordFormatValidationMessage,
    handleKeyPress,
  }
}
