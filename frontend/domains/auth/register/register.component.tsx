import React, {SyntheticEvent} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import Image from 'next/image'

import {Box, Layout, Text, TextButton, TextInput} from '@clubwoof-components'
import {colors} from '@clubwoof-styles'

import {formSchema, inputs} from './form-helpers'
import {
  Container,
  DogImage,
  ErrorMessage,
  Form,
  Heading,
  HeadingContainer,
  SubHeading,
  SubmitButton,
} from './register.styles'
import {FormDetails} from './register.container'
import {useFormHelpers} from '@clubwoof-hooks'

export interface RegisterComponentProps {
  i18n: i18nRegisterPage
  error: string
  registrationComplete: boolean
  registerUser: (data: FormDetails) => Promise<void>
}

interface RegisterCompleteProps {
  i18n: i18nRegisterPage
}
const RegisterComplete: React.FC<RegisterCompleteProps> = ({i18n}) => (
  <div>
    <Text element={'h1'} marginBottom={'space2x'}>
      {i18n.registrationSuccessfulText}
    </Text>
    <Text element={'h3'}>{i18n.checkYourEmailText}</Text>
  </div>
)

export const RegisterComponent: React.FC<RegisterComponentProps> = (props) => {
  const {i18n, registrationComplete, error, registerUser} = props
  const {control, handleSubmit, formState} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema(i18n)),
  })
  const formInputs = inputs(i18n)

  const {
    jumpToNextInputOnEnter,
    getInputErrorMessage,
    getPasswordFormatValidationMessage,
    formHasErrors,
  } = useFormHelpers({
    formInputs,
    formState,
  })

  const handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (formHasErrors) return

    await handleSubmit(registerUser)()
  }

  return (
    <Layout
      bubbleOnePositioning="top"
      bubbleTwoPositioning="right"
      backgroundColor="pureWhite"
    >
      <Container>
        <Box centerContent>
          <DogImage>
            <Image src="/dog-on-phone.svg" alt="dog on phone" fill />
          </DogImage>
        </Box>
        {!registrationComplete ? (
          <>
            <HeadingContainer>
              <Heading>{i18n.heading}</Heading>
              <SubHeading>{i18n.subHeading}</SubHeading>
            </HeadingContainer>
            <Form>
              {formInputs.map((input, index) => {
                const errorMessage = getInputErrorMessage(input.name)
                return (
                  <Controller
                    key={index}
                    render={({field}) => (
                      <TextInput
                        {...field}
                        icon={<input.icon color={colors.lightBlue} size="21" />}
                        aria-label={input.ariaLabel}
                        type={input.type}
                        placeholder={input.placeholder}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          jumpToNextInputOnEnter(e, index + 1)
                        }
                        ref={null}
                        error={errorMessage && errorMessage}
                      />
                    )}
                    name={input.name}
                    control={control}
                    defaultValue=""
                  />
                )
              })}

              <ErrorMessage>
                {getPasswordFormatValidationMessage()}
                {error}
              </ErrorMessage>

              <SubmitButton type="button" aria-label="Submit" onClick={handleSubmitForm}>
                {i18n.submitButtonText}
              </SubmitButton>

              <Box centerContent direction={'column'} marginTop={'space2x'}>
                <Text fontSize={'s'} marginBottom={'space1x'}>
                  {i18n.signInQuestion}
                  <TextButton fontSize={'s'} colour={'pink'} href={'/auth/login'}>
                    {i18n.signInText}
                  </TextButton>
                </Text>
                <Text fontSize={'s'}>
                  {i18n.goHomeQuestion}
                  <TextButton fontSize={'s'} colour={'pink'} href={'/auth/login'}>
                    {i18n.goHomeText}
                  </TextButton>
                </Text>
              </Box>
            </Form>
          </>
        ) : (
          <RegisterComplete i18n={i18n} />
        )}
      </Container>
    </Layout>
  )
}
