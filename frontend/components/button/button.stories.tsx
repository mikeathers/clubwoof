import {Button} from '@clubwoof-components'
import {StoryFn} from '@storybook/react'
import {StyledButtonProps} from './button.styles'
import styled from 'styled-components'

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story: React.FC) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

const Container = styled.div`
  width: 200px;
  padding: 50px;
`

export const Primary: StoryFn<StyledButtonProps> = () => (
  <Button primary>Click me!</Button>
)

export const Secondary: StoryFn<StyledButtonProps> = () => (
  <Button secondary>Click me!</Button>
)

export const PrimaryPink: StoryFn<StyledButtonProps> = () => (
  <Button primary pink>
    Click me!
  </Button>
)

export const SecondaryPink: StoryFn<StyledButtonProps> = () => (
  <Button secondary pink>
    Click me!
  </Button>
)
