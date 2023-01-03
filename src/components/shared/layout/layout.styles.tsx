import styled from 'styled-components'
import { Colors, colors, Spacing, spacing } from '@clubwoof-styles'

export interface ContentProps {
  width: 'narrow' | 'wide' | 'fullScreen'
  paddingTop?: keyof Spacing
}

export interface ContainerProps {
  backgroundColor?: keyof Colors
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors[backgroundColor] : colors.offWhite};
  min-height: 100vh;
`

export const Content = styled.div<ContentProps>`
  width: ${({ width }) => {
    switch (width) {
      case 'wide':
        return '80%'
      case 'narrow':
        return '30%'
      case 'fullScreen':
        return '100%'
    }
  }};
  margin: 0 auto;
  min-height: 100vh;
  padding-top: ${({ paddingTop }) =>
    paddingTop ? spacing[paddingTop] : spacing.space5x};
`
