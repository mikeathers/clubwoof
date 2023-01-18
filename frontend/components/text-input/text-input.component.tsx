import React from 'react'
import {
  ErrorContainer,
  Icon,
  StyledTextInputProps,
  TextInput as Input,
  TextInputContainer,
} from './text-input.styles'
import {Text} from '../text'
import {Colors} from '@clubwoof-styles'

export interface TextInputProps extends StyledTextInputProps {
  error?: string
  errorColor?: keyof Colors
  // eslint-disable-next-line
  ref?: React.RefObject<any> | null
}
export const TextInput: React.FC<TextInputProps> = (props) => {
  const {error, errorColor, icon} = props
  return (
    <TextInputContainer error={!!error}>
      {icon && <Icon color={props.color}>{icon}</Icon>}
      <Input {...props} />

      <ErrorContainer icon={icon}>
        {error && (
          <Text color={errorColor || 'red'} fontSize="s">
            {error}
          </Text>
        )}
      </ErrorContainer>
    </TextInputContainer>
  )
}
