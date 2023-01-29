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
  color?: keyof Colors
  href: string | UrlObject
  fontWeight?: keyof FontWeights
  fontSize?: keyof FontSizes
  underline?: boolean
  marginTop?: keyof Spacing
  marginBottom?: keyof Spacing
}

export const StyledTextButton = styled(Link)<StyledTextButtonProps>`
  color: ${({color}) => (color ? colors[color] : colors.darkBlue)};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.bold};
  text-decoration: none;
  font-size: ${({fontSize}) => (fontSize ? fontSizes[fontSize] : fontSizes.m)};
  border-bottom: ${({underline, color}) => {
    if (color && underline) return `2px solid ${colors[color]}`
    if (!color && underline) return `2px solid ${colors.darkBlue}`
    if (!color && !underline) return ''
  }};
  margin-top: ${({marginTop}) => (marginTop ? spacing[marginTop] : 0)};
  margin-bottom: ${({marginBottom}) => (marginBottom ? spacing[marginBottom] : 0)};
`
