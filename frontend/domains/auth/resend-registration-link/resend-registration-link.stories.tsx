import {ResendRegistrationLinkComponent} from './resend-registration-link.component'
import {resendRegistrationLinkPageI18nMock} from '@clubwoof-test-utils'
import {noop} from 'lodash-es'

export default {
  title: 'Domains/Auth/ResendRegistrationLink',
  component: ResendRegistrationLinkComponent,
}

export const Base = () => (
  <ResendRegistrationLinkComponent
    i18n={resendRegistrationLinkPageI18nMock}
    clearErrors={() => noop}
    resendRegistrationLink={() => noop}
    linkSentSuccessfully={false}
    error={undefined}
  />
)
