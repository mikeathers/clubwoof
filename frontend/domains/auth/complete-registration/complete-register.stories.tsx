import {StoryFn} from '@storybook/react'
import {AuthProvider} from '@clubwoof-context'
import {
  CompleteRegistrationComponent,
  CompleteRegistrationComponentProps,
} from './complete-registration.component'
import {completeRegistrationPageI18nMock} from '@clubwoof-test-utils'

export default {
  title: 'Domains/Auth/CompleteRegistration',
  component: CompleteRegistrationComponent,
  decorators: [
    (Story: React.FC) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
}

const defaultProps: CompleteRegistrationComponentProps = {
  i18n: completeRegistrationPageI18nMock,
  loginSuccessful: true,
}

export const LoginSuccessful: StoryFn<CompleteRegistrationComponentProps> = () => {
  return <CompleteRegistrationComponent {...defaultProps} />
}

export const LoginUnsuccessful: StoryFn<CompleteRegistrationComponentProps> = () => {
  return <CompleteRegistrationComponent {...defaultProps} loginSuccessful={false} />
}
