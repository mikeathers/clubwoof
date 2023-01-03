import styled from 'styled-components'
import { Button, Form } from 'grommet'
import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  mediaQueries,
  spacing,
} from '@clubwoof-styles'

export const Container = styled.div`
  height: 100%;
  padding: ${spacing.space1x};

  @media (${mediaQueries.s}) {
    padding: 0;
  }
`

export const Heading = styled.h1`
  font-family: ${fonts.headingFont};
  font-size: ${fontSizes.xxxl};
  color: ${colors.lightBlue};
  margin-bottom: ${spacing.space4x};
  line-height: ${lineHeights.display};
`
export const RegisterForm = styled(Form)`
  margin-bottom: ${spacing.space5x};
`
export const SubmitButton = styled(Button)`
  background: ${colors.lightYellow};
  border: none;
  width: 150px;
  margin-top: ${spacing.space2x};
  align-self: center;
  font-family: ${fonts.headingFont};
  color: ${colors.lightBlue};

  &:hover {
    box-shadow: 0px 0px 0px 2px ${colors.lightYellow};
  }
`
