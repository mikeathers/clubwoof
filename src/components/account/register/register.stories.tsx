import {Register} from '@clubwoof-components'
import {ComponentMeta, ComponentStory} from '@storybook/react'

export default {
  title: 'components/account/register',
  component: Register,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Register>

const Template: ComponentStory<typeof Register> = (args) => <Register {...args} />

export const DefaultView = Template.bind({})
DefaultView.args = {
  submitted: false,
}
