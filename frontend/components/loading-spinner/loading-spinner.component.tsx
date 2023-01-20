import React from 'react'
import {
  Container,
  StyledCircle,
  StyledLoadingSpinner,
  StyledLoadingSpinnerProps,
  StyledPath,
} from './loading-spinner.styles'
import {colors, Colors} from '@clubwoof-styles'

/**
 * Required for button loading states but not officially part of the design system (yet) so hidden in the button directory
 * to discourage external use
 */

export interface LoadingSpinnerClassNameProps {
  svg?: string
  circleForeground?: string
  circleBackground?: string
}

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLOrSVGElement>,
    LoadingSpinnerClassNameProps,
    StyledLoadingSpinnerProps {
  size?: number
  color?: keyof Colors
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const {
    size = 32,
    color,
    circleForeground = colors.pureWhite,
    circleBackground = colors.grey,
  } = props
  return (
    <Container>
      <StyledLoadingSpinner
        xmlns="https://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden="true"
        color={color}
      >
        <StyledCircle cx="16" cy="16" r="11" stroke={circleBackground} />
        <StyledPath
          d="M5,16a11,11 0 1,0 22,0a11,11 0 1,0 -22,0"
          stroke={circleForeground}
        />
      </StyledLoadingSpinner>
    </Container>
  )
}
