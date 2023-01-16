import styled from 'styled-components'
import {spacing, Spacing} from '@clubwoof-styles'

export interface StyledBoxProps {
  centerContent?: boolean
  leftAlign?: boolean
  rightAlign?: boolean
  topAlign?: boolean
  bottomAlign?: boolean
  direction?: 'row' | 'column'
  padding?: keyof Spacing
}
export const StyledBox = styled.div<StyledBoxProps>`
  width: ${({padding}) => (!padding ? '100%' : null)};
  display: flex;
  justify-content: ${(props) => {
    if (props.centerContent) return 'center'
    if (props.topAlign) return 'flex-start'
    if (props.bottomAlign) return 'flex-end'
    return 'center'
  }};
  align-items: ${(props) => {
    if (props.centerContent) return 'center'
    if (props.topAlign) return 'flex-start'
    if (props.bottomAlign) return 'flex-end'
    return 'center'
  }};
  flex-direction: ${(props) => props.direction || 'row'};
  padding: ${({padding}) => padding && spacing[padding]};
`
