import styled from 'styled-components'
import {colors, fontSizes, fontWeights, mediaQueries, spacing} from '@clubwoof-styles'

export const LanguageSelectionContainer = styled.div`
  position: absolute;
  top: ${spacing.space2x};
  right: ${spacing.space2x};
  cursor: pointer;
  z-index: 2;
  color: ${colors.pureWhite};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.s};

  @media (${mediaQueries.s}) {
    color: ${colors.pureWhite};
  }
`
