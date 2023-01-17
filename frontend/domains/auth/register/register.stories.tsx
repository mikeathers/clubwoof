import {RegisterComponent, RegisterComponentProps} from './register.component'
import {StoryFn} from '@storybook/react'
import {noop} from '@babel/types'
import {registerPageI18nMock} from '@clubwoof-test-utils'
import {useEffect} from 'react'

export default {
  title: 'Domains/Auth/Register',
  component: RegisterComponent,
}

const defaultProps: RegisterComponentProps = {
  i18n: registerPageI18nMock,
  registerUser: () => new Promise(noop),
  registrationComplete: false,
  error: '',
}

export const RegisterToBegin: StoryFn<RegisterComponentProps> = () => {
  return <RegisterComponent {...defaultProps} />
}

export const RegistrationComplete: StoryFn<RegisterComponentProps> = () => {
  return <RegisterComponent {...defaultProps} registrationComplete={true} />
}

export const WithError: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    ...defaultProps,
    error: 'Something terrible has happened. Please try again later.',
  }
  return <RegisterComponent {...props} />
}

export const WithValidationError: StoryFn<RegisterComponentProps> = () => {
  useEffect(() => {
    const submitButton = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement
    submitButton.click()
  }, [])

  return <RegisterComponent {...defaultProps} />
}
