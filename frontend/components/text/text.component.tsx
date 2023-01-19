import React, {ReactNode} from 'react'
import {StyledH1, StyledH2, StyledH3, StyledP, StyledTextProps} from './text.styles'

interface TextProps extends StyledTextProps {
  children: ReactNode
}
export const Text: React.FC<TextProps> = (props) => {
  const {children, element} = props
  if (element === 'p') return <StyledP {...props}>{children}</StyledP>
  if (element === 'h1') return <StyledH1 {...props}>{children}</StyledH1>
  if (element === 'h2') return <StyledH2 {...props}>{children}</StyledH2>
  if (element === 'h3') return <StyledH3 {...props}>{children}</StyledH3>
  return <StyledP {...props}>{children}</StyledP>
}
