import {ComponentMeta, ComponentStory} from '@storybook/react'
import {AuthProvider} from '@clubwoof-context'
import {CompleteRegistrationComponent} from './complete-registration.component'

export default {
  title: 'components/account/complete-registration',
  component: CompleteRegistrationComponent,
  decorators: [
    (Story: React.FC) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} as ComponentMeta<typeof CompleteRegistrationComponent>

const Template: ComponentStory<typeof CompleteRegistrationComponent> = (args) => (
  <CompleteRegistrationComponent {...args} />
)

export const DefaultView = Template.bind({})
DefaultView.args = {
  loginSuccessful: true,
}
