import {LanguageSelection} from '@clubwoof-components'
import {StoryFn} from '@storybook/react'
import styled from 'styled-components'
import {colors} from '@clubwoof-styles'

export default {
  title: 'Components/LanguageSelection',
  component: LanguageSelection,
}

export const Base: StoryFn = () => <LanguageSelection />

export const WhiteText: StoryFn = () => {
  const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${colors.pink};
  `
  return (
    <Container>
      <LanguageSelection textColour={'pureWhite'} />
    </Container>
  )
}
