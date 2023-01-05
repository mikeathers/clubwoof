import React from 'react'
import {
  Icon,
  TextInput as Input,
  TextInputContainer,
  TextInputProps,
} from './text-input.styles'

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInputContainer>
      <Icon>{props.icon}</Icon>
      <Input {...props} />
    </TextInputContainer>
  )
}
