import styled, {css} from 'styled-components'
import {
  colors,
  Colors,
  fonts,
  fontSizes,
  FontSizes,
  fontWeights,
  FontWeights,
  LineHeights,
  lineHeights,
  spacing,
  Spacing,
} from '@clubwoof-styles'

export interface StyledTextProps {
  fontSize?: keyof FontSizes
  color?: keyof Colors
  fontWeight?: keyof FontWeights
  element?: keyof JSX.IntrinsicElements
  marginBottom?: keyof Spacing
  lineHeight?: keyof LineHeights
}

const textStyles = css<StyledTextProps>`
  display: flex;
  min-height: 28px;
  font-size: ${({fontSize, element}) => {
    if (fontSize) return fontSizes[fontSize]
    if (element === 'p') return fontSizes.m
    if (element === 'h1') return fontSizes.xxxxl
    if (element === 'h2') return fontSizes.l
    if (element === 'h3') return fontSizes.m
  }};

  color: ${({color, element}) => {
    if (color) {
      return colors[color]
    }
    if (element === 'h1') return colors.lightBlue
  }};
  line-height: ${({lineHeight, element}) => {
    if (element === 'h1') return lineHeights.heading
    if (lineHeight) return lineHeights[lineHeight]
    return lineHeights.body
  }};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.medium};
  font-family: ${({element}) => {
    if (element === 'h1') return fonts.headingFont
    return fonts.bodyFont
  }};
  margin-bottom: ${({marginBottom}) => {
    if (marginBottom) return spacing[marginBottom]
  }};

  a {
    margin-left: ${spacing.spaceHalfx};
  }
`
export const StyledP = styled.p<StyledTextProps>`
  ${textStyles}
`

export const StyledH1 = styled.h1<StyledTextProps>`
  ${textStyles}
`
export const StyledH2 = styled.h2<StyledTextProps>`
  ${textStyles}
`
export const StyledH3 = styled.h3<StyledTextProps>`
  ${textStyles}
`
