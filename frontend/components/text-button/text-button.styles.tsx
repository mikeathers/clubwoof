import styled from 'styled-components'
import Link from 'next/link'
import {
  Colors,
  colors,
  fontSizes,
  FontSizes,
  fontWeights,
  FontWeights,
  spacing,
  Spacing,
} from '@clubwoof-styles'
import {UrlObject} from 'url'

export interface StyledTextButtonProps {
  colour?: keyof Colors
  href: string | UrlObject
  fontWeight?: keyof FontWeights
  fontSize?: keyof FontSizes
  underline?: boolean
  marginTop?: keyof Spacing
  marginBottom?: keyof Spacing
}

export const StyledTextButton = styled(Link)<StyledTextButtonProps>`
  color: ${({colour}) => (colour ? colors[colour] : colors.darkBlue)};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.bold};
  text-decoration: none;
  font-size: ${({fontSize}) => (fontSize ? fontSizes[fontSize] : fontSizes.m)};
  border-bottom: ${({underline, colour}) => {
    if (colour && underline) return `2px solid ${colors[colour]}`
    if (!colour && underline) return `2px solid ${colors.darkBlue}`
    if (!colour && !underline) return ''
  }};
  margin-top: ${({marginTop}) => (marginTop ? spacing[marginTop] : 0)};
  margin-bottom: ${({marginBottom}) => (marginBottom ? spacing[marginBottom] : 0)};
`
