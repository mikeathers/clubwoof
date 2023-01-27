import {noop} from 'lodash-es'
import {StoryFn} from '@storybook/react'

import {forgotPasswordPageI18nMock} from '@clubwoof-test-utils'
import {
  ForgotPasswordComponent,
  ForgotPasswordComponentProps,
} from './forgot-password.component'

export default {
  title: 'Domains/Auth/ForgotPassword',
  component: ForgotPasswordComponent,
}

const defaultProps: ForgotPasswordComponentProps = {
  i18n: forgotPasswordPageI18nMock,
  error: undefined,
  sendForgotPasswordLink: () => noop,
  linkSentSuccessfully: false,
  clearErrors: () => noop,
  isLoading: false,
}

export const Base: StoryFn = () => <ForgotPasswordComponent {...defaultProps} />

export const WithError: StoryFn = () => (
  <ForgotPasswordComponent
    {...defaultProps}
    error={'Something has gone terribly wrong, please try again later.'}
  />
)

export const WithSuccess: StoryFn = () => (
  <ForgotPasswordComponent {...defaultProps} linkSentSuccessfully={true} />
)

export const WithLoading: StoryFn = () => (
  <ForgotPasswordComponent {...defaultProps} isLoading={true} />
)
