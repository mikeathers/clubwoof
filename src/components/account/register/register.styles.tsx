import styled from 'styled-components'
import { Button, Text as GrommetText } from 'grommet'
import Image from 'next/image'

import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  mediaQueries,
  spacing,
} from '@clubwoof-styles'

export const Container = styled.div`
  height: 100%;
  padding: ${spacing.space5x} ${spacing.space3x};
  @media (${mediaQueries.s}) {
    padding: 0;
  }
`
export const DogImage = styled(Image)`
  z-index: 1;
`
export const HeadingContainer = styled.div`
  margin-bottom: ${spacing.space7x};
`

export const Heading = styled.h1`
  font-family: ${fonts.headingFont};
  font-size: ${fontSizes.xxxl};
  font-weight: ${fontWeights.medium};
  color: ${colors.lightBlue};
  line-height: ${lineHeights.display};
`
export const SubHeading = styled.h2`
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.semibold};
  color: ${colors.darkBlue};

  @media (${mediaQueries.l}) {
    font-size: ${fontSizes.l};
  }
`

export const SubmitButton = styled(Button)`
  background: ${colors.lightBlue};
  border: none;
  width: 100%;
  margin-top: ${spacing.space2x};
  font-family: ${fonts.bodyFont};
  color: ${colors.pureWhite};
  border-radius: 10px;
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.bold};

  &:hover {
    filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.161));
  }
`
export const FormContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const LoginText = styled(GrommetText)`
  font-size: ${fontSizes.s};
  margin-top: ${spacing.space2x};

  & > a {
    font-weight: ${fontWeights.bold};
    color: ${colors.pink};
    text-decoration: none;
  }
`
