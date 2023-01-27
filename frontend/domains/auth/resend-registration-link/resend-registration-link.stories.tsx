import {
  ResendRegistrationLinkComponent,
  ResendRegistrationLinkProps,
} from './resend-registration-link.component'
import {resendRegistrationLinkPageI18nMock} from '@clubwoof-test-utils'
import {noop} from 'lodash-es'

export default {
  title: 'Domains/Auth/ResendRegistrationLink',
  component: ResendRegistrationLinkComponent,
}

const defaultProps: ResendRegistrationLinkProps = {
  i18n: resendRegistrationLinkPageI18nMock,
  clearErrors: () => noop,
  resendRegistrationLink: () => noop,
  linkSentSuccessfully: false,
  error: undefined,
  isLoading: false,
}

export const Base = () => <ResendRegistrationLinkComponent {...defaultProps} />

export const WithError = () => (
  <ResendRegistrationLinkComponent
    {...defaultProps}
    error={'Something terrible has happened, please try again later.'}
  />
)

export const WithSuccess = () => (
  <ResendRegistrationLinkComponent {...defaultProps} linkSentSuccessfully={true} />
)

export const WithLoading = () => (
  <ResendRegistrationLinkComponent {...defaultProps} isLoading={true} />
)
