import styled, {css} from 'styled-components'
import {spacing, Spacing} from '@clubwoof-styles'

export interface StyledBoxProps {
  centerContent?: boolean
  leftAlign?: boolean
  rightAlign?: boolean
  topAlign?: boolean
  bottomAlign?: boolean
  direction?: 'row' | 'column'
  padding?: keyof Spacing
  marginTop?: keyof Spacing
  marginBottom?: keyof Spacing
}
export const StyledBox = styled.div<StyledBoxProps>`
  width: ${({padding}) => (!padding ? '100%' : null)};
  display: flex;

  ${({centerContent, leftAlign, rightAlign, direction}) => {
    if (direction === 'column') {
      if (centerContent) return columnCenterAlign
      if (leftAlign) return columnLeftAlign
      if (rightAlign) return columnRightAlign
    }
    if (direction === 'row' || !direction) {
      if (centerContent) return rowCenterAlign
      if (leftAlign) return rowLeftAlign
      if (rightAlign) return rowRightAlign
    }
    if (!direction && !centerContent && !rightAlign && !leftAlign) {
      return rowCenterAlign
    }
  }}
  flex-direction: ${(props) => props.direction || 'row'};
  padding: ${({padding}) => padding && spacing[padding]};
  margin-top: ${({marginTop}) => (marginTop ? spacing[marginTop] : 0)};
  margin-bottom: ${({marginBottom}) => (marginBottom ? spacing[marginBottom] : 0)};
`

const rowLeftAlign = css`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`

const columnLeftAlign = css`
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

const rowRightAlign = css`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`

const columnRightAlign = css`
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`

const rowCenterAlign = css`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const columnCenterAlign = css`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
