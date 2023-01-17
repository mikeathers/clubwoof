import {StyledBox, StyledBoxProps} from './box.styles'

export interface BoxProps extends StyledBoxProps {
  children: JSX.Element | JSX.Element[] | string[] | string
}
export const Box: React.FC<BoxProps> = (props) => {
  const {children} = props
  return <StyledBox {...props}>{children}</StyledBox>
}
