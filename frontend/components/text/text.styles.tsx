import styled from 'styled-components'
import {
  colors,
  Colors,
  fonts,
  fontSizes,
  FontSizes,
  fontWeights,
  FontWeights,
  lineHeights,
  spacing,
  Spacing,
} from '@clubwoof-styles'

export interface StyledTextProps {
  fontSize?: keyof FontSizes
  color?: keyof Colors
  fontWeight?: keyof FontWeights
  element?: 'h1' | 'h2' | 'h3' | 'p'
  paddingBottom?: keyof Spacing
}
export const Text = styled.p<StyledTextProps>`
  font-size: ${({fontSize, element}) => {
    if (fontSize) return fontSizes[fontSize]
    if (element === 'p') return fontSizes.m
    if (element === 'h1') return fontSizes.xxxl
    if (element === 'h2') return fontSizes.xl
    if (element === 'h3') return fontSizes.l
  }};
  color: ${({color, element}) => {
    if (color) {
      return colors[color]
    }
    if (element === 'h1') return colors.lightBlue
  }};
  line-height: ${({element}) => {
    if (element === 'h1') return lineHeights.heading
    return lineHeights.display
  }};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.medium};
  font-family: ${({element}) => {
    if (element === 'h1') return fonts.headingFont
    return fonts.bodyFont
  }};
  padding-bottom: ${({paddingBottom}) => {
    if (paddingBottom) return spacing[paddingBottom]
  }};
`
