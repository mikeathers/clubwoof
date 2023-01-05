import React from 'react'
import {
  ErrorContainer,
  Icon,
  StyledTextInputProps,
  TextInput as Input,
  TextInputContainer,
} from './text-input.styles'
import {Text} from '../text'

interface TextInputProps extends StyledTextInputProps {
  error?: string
  // eslint-disable-next-line
  ref: React.RefObject<any> | null
}
export const TextInput: React.FC<TextInputProps> = (props) => {
  const {error, icon} = props
  return (
    <TextInputContainer error={!!error}>
      <Icon>{icon}</Icon>
      <Input {...props} />

      <ErrorContainer>
        {error && (
          <Text color="red" fontSize="s">
            {error}
          </Text>
        )}
      </ErrorContainer>
    </TextInputContainer>
  )
}
