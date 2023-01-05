import React from 'react'
import {
  Icon,
  StyledTextInputProps,
  TextInput as Input,
  TextInputContainer,
} from './text-input.styles'
import { Text } from '../text'

interface TextInputProps extends StyledTextInputProps {
  error?: string
  ref: React.RefObject<any> | null
}
export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInputContainer error={!!props.error}>
      <Icon>{props.icon}</Icon>
      <Input {...props} />
      {props.error && <Text color={'red'}>{props.error}</Text>}
    </TextInputContainer>
  )
}
