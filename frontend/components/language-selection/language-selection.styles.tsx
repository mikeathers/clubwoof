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
  languageSelectionTextColour?: keyof Colors
}

export const LanguageSelectionContainer = styled.div<LanguageSelectionProps>`
  position: absolute;
  top: ${spacing.space2x};
  right: ${spacing.space2x};
  cursor: pointer;
  z-index: 2;
  color: ${({languageSelectionTextColour}) => {
    if (!languageSelectionTextColour) return colors.pureWhite
    return colors[languageSelectionTextColour]
  }};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.s};

  @media (${mediaQueries.s}) {
    color: ${({languageSelectionTextColour}) => {
      if (!languageSelectionTextColour) return colors.darkBlue
      return colors[languageSelectionTextColour]
    }};
  }
`
