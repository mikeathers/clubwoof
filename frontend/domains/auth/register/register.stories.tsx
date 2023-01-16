import {RegisterComponent, RegisterComponentProps} from './register.component'
import {StoryFn} from '@storybook/react'
import {noop} from '@babel/types'
import {registerPageI18nMock} from '@clubwoof-test-utils'
import {useEffect} from 'react'

export default {
  title: 'components/auth/register',
  component: RegisterComponent,
}

export const RegisterToBegin: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    i18n: registerPageI18nMock,
    registerUser: () => new Promise(noop),
    registrationComplete: false,
    error: '',
  }
  return <RegisterComponent {...props} />
}

export const RegistrationComplete: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    i18n: registerPageI18nMock,
    registerUser: () => new Promise(noop),
    registrationComplete: true,
    error: '',
  }
  return <RegisterComponent {...props} />
}

export const WithError: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    i18n: registerPageI18nMock,
    registerUser: () => new Promise(noop),
    registrationComplete: false,
    error: 'Something terrible has happened. Please try again later.',
  }
  return <RegisterComponent {...props} />
}

export const WithValidationError: StoryFn<RegisterComponentProps> = () => {
  const props: RegisterComponentProps = {
    i18n: registerPageI18nMock,
    registerUser: () => new Promise(noop),
    registrationComplete: false,
    error: '',
  }

  useEffect(() => {
    const submitButton = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement
    submitButton.click()
  }, [])

  return <RegisterComponent {...props} />
}
