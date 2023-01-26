import React from 'react'
import {StyledButton, StyledButtonProps, StyledLoadingContainer} from './button.styles'
import {Colors} from '@clubwoof-styles'
import {LoadingSpinner} from '../loading-spinner'

export interface ButtonProps extends StyledButtonProps {
  children: JSX.Element | JSX.Element[] | string[] | string
  loadingSpinnerColor?: keyof Colors
}
export const Button: React.FC<ButtonProps> = (props) => {
  const {children, isLoading, loadingSpinnerColor} = props
  return (
    <StyledButton {...props}>
      {isLoading ? (
        <StyledLoadingContainer>
          Loading <LoadingSpinner size={24} color={loadingSpinnerColor} />
        </StyledLoadingContainer>
      ) : (
        children
      )}
    </StyledButton>
  )
}
