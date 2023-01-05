import React from 'react'
import { StyledTextProps, Text as StyledText } from './text.styles'

interface TextProps extends StyledTextProps {
  children: JSX.Element | JSX.Element[] | string[] | string
}
export const Text: React.FC<TextProps> = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>
}
