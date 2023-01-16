import styled from 'styled-components'

export interface StyledBoxProps {
  centerContent?: boolean
  leftAlign?: boolean
  rightAlign?: boolean
  topAlign?: boolean
  bottomAlign?: boolean
  direction?: 'row' | 'column'
}
export const StyledBox = styled.div<StyledBoxProps>`
  width: 100%;
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
  flex-display: ${(props) => props.direction || 'row'};
`
