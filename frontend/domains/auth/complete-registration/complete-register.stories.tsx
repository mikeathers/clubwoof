import {StoryFn} from '@storybook/react'
import {AuthProvider} from '@clubwoof-context'
import {
  CompleteRegistrationComponent,
  CompleteRegistrationComponentProps,
} from './complete-registration.component'

export default {
  title: 'components/auth/complete-registration',
  component: CompleteRegistrationComponent,
  decorators: [
    (Story: React.FC) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
}

export const LoginSuccessful: StoryFn<CompleteRegistrationComponentProps> = (args) => (
  <CompleteRegistrationComponent {...args} />
)
LoginSuccessful.args = {loginSuccessful: true}

export const LoginUnsuccessful: StoryFn<CompleteRegistrationComponentProps> = (args) => (
  <CompleteRegistrationComponent {...args} />
)
LoginUnsuccessful.args = {loginSuccessful: false}
