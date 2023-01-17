import {StoryFn} from '@storybook/react'
import {TextProps} from '@storybook/blocks'
import {Text} from '@clubwoof-components'
import styled from 'styled-components'

export default {
  title: 'Components/Text',
  component: Text,
  decorators: [
    (Story: React.FC) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
}

const Container = styled.div`
  padding: 30px;
`

export const H1: StoryFn<TextProps> = () => <Text element={'h1'}>clubwoof</Text>

export const H2: StoryFn<TextProps> = () => <Text element={'h2'}>clubwoof</Text>

export const H3: StoryFn<TextProps> = () => <Text element={'h3'}>clubwoof</Text>

export const P: StoryFn<TextProps> = () => <Text element={'p'}>clubwoof</Text>
