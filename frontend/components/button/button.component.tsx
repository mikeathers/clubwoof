import React from 'react'
import {StyledButton, StyledButtonProps} from './button.styles'

export interface ButtonProps extends StyledButtonProps {
  children: JSX.Element | JSX.Element[] | string[] | string
}
export const Button: React.FC<ButtonProps> = (props) => {
  const {children} = props
  return <StyledButton {...props}>{children}</StyledButton>
}
