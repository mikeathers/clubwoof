import styled from 'styled-components'
import {
  Colors,
  colors,
  fontSizes,
  fontWeights,
  mediaQueries,
  spacing,
} from '@clubwoof-styles'

export interface LanguageSelectionProps {
  textColour?: keyof Colors
}

export const LanguageSelectionContainer = styled.div<LanguageSelectionProps>`
  position: absolute;
  top: ${spacing.space2x};
  right: ${spacing.space2x};
  cursor: pointer;
  z-index: 2;
  color: ${({textColour}) => {
    if (!textColour) return colors.pureWhite
    return colors[textColour]
  }};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.s};

  @media (${mediaQueries.s}) {
    color: ${({textColour}) => {
      if (!textColour) return colors.darkBlue
      return colors[textColour]
    }};
  }
`
