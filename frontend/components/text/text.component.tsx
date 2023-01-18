import React, {ReactNode} from 'react'
import {StyledTextProps, Text as StyledText} from './text.styles'

interface TextProps extends StyledTextProps {
  children: ReactNode
}
export const Text: React.FC<TextProps> = (props) => {
  const {children} = props
  return <StyledText {...props}>{children}</StyledText>
}
