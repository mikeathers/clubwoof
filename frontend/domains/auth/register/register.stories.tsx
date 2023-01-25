import {useEffect} from 'react'
import {noop} from 'lodash-es'
import {StoryFn} from '@storybook/react'

import {registerPageI18nMock} from '@clubwoof-test-utils'

import {RegisterComponent, RegisterComponentProps} from './register.component'

export default {
  title: 'Domains/Auth/Register',
  component: RegisterComponent,
}

const defaultProps: RegisterComponentProps = {
  i18n: registerPageI18nMock,
  registrationComplete: false,
  error: null,
  onSubmit: () => new Promise(noop),
  isLoading: false,
}

export const Base: StoryFn<RegisterComponentProps> = () => {
  return <RegisterComponent {...defaultProps} />
}

export const RegistrationComplete: StoryFn<RegisterComponentProps> = () => {
  return <RegisterComponent {...defaultProps} registrationComplete={true} />
}

export const WithError: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    ...defaultProps,
    error: new Error('Something terrible has happened. Please try again later.'),
  }
  return <RegisterComponent {...props} />
}

export const IsLoading: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    ...defaultProps,
    isLoading: true,
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
