import {StyledTextButton, StyledTextButtonProps} from './text-button.styles'

export interface TextButtonProps extends StyledTextButtonProps {
  children: JSX.Element | JSX.Element[] | string[] | string
}

export const TextButton: React.FC<TextButtonProps> = (props) => {
  const {children} = props

  return <StyledTextButton {...props}>{children}</StyledTextButton>
}
