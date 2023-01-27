import {
  CompleteForgotPasswordComponent,
  CompleteForgotPasswordComponentProps,
} from './complete-forgot-password.component'

import {completeForgotPasswordPageI18nMock} from '@clubwoof-test-utils'
import {noop} from 'lodash-es'

export default {
  title: 'Domains/Auth/CompleteForgotPassword',
  component: CompleteForgotPasswordComponent,
}

const defaultProps: CompleteForgotPasswordComponentProps = {
  i18n: completeForgotPasswordPageI18nMock,
  error: undefined,
  isLoading: false,
  clearErrors: () => noop,
  updatePassword: () => noop,
}

export const Base = () => <CompleteForgotPasswordComponent {...defaultProps} />

export const WithError = () => (
  <CompleteForgotPasswordComponent
    {...defaultProps}
    error={'Something terrible has happened, please try again later.'}
  />
)

export const WithLoading = () => (
  <CompleteForgotPasswordComponent {...defaultProps} isLoading={true} />
)
