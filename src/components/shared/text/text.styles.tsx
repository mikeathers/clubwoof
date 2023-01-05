import styled from 'styled-components'
import {
  colors,
  Colors,
  fontSizes,
  FontSizes,
  fontWeights,
  FontWeights,
  lineHeights,
} from '@clubwoof-styles'

export interface StyledTextProps {
  fontSize?: keyof FontSizes
  color?: keyof Colors
  fontWeight?: keyof FontWeights
}
export const Text = styled.p<StyledTextProps>`
  font-size: ${({fontSize}) => (fontSize ? fontSizes[fontSize] : fontSizes.m)};
  color: ${({color}) => (color ? colors[color] : colors.darkBlue)};
  line-height: ${lineHeights.body};
  font-weight: ${({fontWeight}) =>
    fontWeight ? fontWeights[fontWeight] : fontWeights.medium};
`
