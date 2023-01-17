import {TextButton, TextButtonProps} from './text-button.component'
import {StoryFn} from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Components/TextButton',
  component: TextButton,
  decorators: [
    (Story: React.FC) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

const Container = styled.div`
  padding: 20px;
`

export const Base: StoryFn<TextButtonProps> = () => (
  <TextButton href={'/'}>Go home</TextButton>
)

export const Underlined: StoryFn<TextButtonProps> = () => (
  <TextButton href={'/'} underline>
    Go home
  </TextButton>
)

export const DifferentColour: StoryFn<TextButtonProps> = () => (
  <TextButton href={'/'} colour={'pink'}>
    Go home
  </TextButton>
)

export const DifferentFontWeight: StoryFn<TextButtonProps> = () => (
  <TextButton href={'/'} fontWeight={'medium'} underline>
    Go home
  </TextButton>
)
