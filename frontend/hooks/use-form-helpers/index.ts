import React, {useEffect, useState} from 'react'
import {IconType} from 'react-icons'
import {FormState} from 'react-hook-form'
import {FormDetails} from '@clubwoof-domains'

interface UseFormHelpersReturnValue {
  jumpToNextInputOnEnter: (e: React.KeyboardEvent<HTMLElement>, index: number) => void
  getInputErrorMessage: (inputName: string) => string
  getPasswordFormatValidationMessage: () => string
  formHasErrors: boolean
}

type FormInput = {
  icon: IconType
  ariaLabel: string
  name: string
  type: string
  placeholder: string
}

interface UseFormHelpersProps {
  formInputs: FormInput[]
  formState: FormState<FormDetails>
}

export const useFormHelpers = (props: UseFormHelpersProps): UseFormHelpersReturnValue => {
  const {formInputs, formState} = props

  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement | null>(null)

  const addInteractiveFieldsToState = () => {
    if (!formInputs.length) return
    const inputs: HTMLInputElement[] = []
    formInputs.forEach((inputData: FormInput) => {
      const {ariaLabel} = inputData
      const input = document.querySelector(
        `[aria-label='${ariaLabel}']`,
      ) as HTMLInputElement
      inputs.push(input)
    })

    const submitButtonElement = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement

    setSubmitButton(submitButtonElement)
    setInputLabels(inputs)
  }

  useEffect(() => {
    addInteractiveFieldsToState()
  }, [])

  const jumpToNextInputOnEnter = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    console.log({index, submitButton})
    console.log(formInputs.length)
    if (e.key === 'Enter') {
      if (index < formInputs.length) {
        const input = inputLabels[index]
        if (input) {
          input.focus()
        }
      }
      if (index === formInputs.length) {
        if (submitButton) {
          submitButton.focus()
        }
      }
    }
  }

  const getInputErrorMessage = (inputName: string) => {
    const errorMessage = formState.errors[inputName]?.message
    if (!errorMessage) return ''
    return (errorMessage as string).includes('contain') ? '' : `${errorMessage}`
  }

  const getPasswordFormatValidationMessage = () => {
    const {errors} = formState
    if (Object.keys(errors).length === 0) return ''
    const errorMessage = `${errors['password']?.message}`
    if (!errorMessage) return ''
    if (errorMessage && errorMessage.includes('contain')) return errorMessage
    return ''
  }

  const formHasErrors = Object.keys(formState.errors).length > 0

  return {
    jumpToNextInputOnEnter,
    getInputErrorMessage,
    getPasswordFormatValidationMessage,
    formHasErrors,
  }
}
