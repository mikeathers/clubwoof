import styled from 'styled-components'
import Link from 'next/link'
import {
  Colors,
  colors,
  fontSizes,
  FontSizes,
  fontWeights,
  FontWeights,
  Spacing,
  spacing,
} from '@clubwoof-styles'
import React from 'react'
import {UrlObject} from 'url'

export interface StyledTextButtonProps extends ContainerProps {
  colour?: keyof Colors
  href: string | UrlObject
  fontWeight?: keyof FontWeights
  fontSize?: keyof FontSizes
  underline?: boolean
}

interface ContainerProps {
  padding?: keyof Spacing
}

export const StyledTextButton = styled(Link)<StyledTextButtonProps>`
  color: ${({colour}) => (colour ? colors[colour] : colors.darkBlue)};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.bold};
  text-decoration: none;
  font-size: ${({fontSize}) => (fontSize ? fontSizes[fontSize] : fontSizes.m)};
  padding: 1px 3px;
  border-bottom: ${({underline, colour}) => {
    if (colour && underline) return `2px solid ${colors[colour]}`
    if (!colour && underline) return `2px solid ${colors.darkBlue}`
    if (!colour && !underline) return ''
  }};
`

export const Container = styled.div<ContainerProps>`
  padding: ${({padding}) => (padding ? spacing[padding] : 0)};
`
