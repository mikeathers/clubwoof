import React, {SyntheticEvent} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import Image from 'next/image'

import {
  Box,
  Button,
  Content,
  Form,
  Layout,
  Text,
  TextButton,
  TextInput,
} from '@clubwoof-components'
import {colors} from '@clubwoof-styles'
import {useFormHelpers} from '@clubwoof-hooks'

import {formSchema, inputs} from './form-helpers'
import {DogImage} from './register.styles'

export interface RegisterComponentProps {
  i18n: i18nRegisterPage
  error: Error | null | undefined
  registrationComplete: boolean
  onSubmit: (data: FormDetails) => Promise<void>
  isLoading: boolean
}

interface RegisterCompleteProps {
  i18n: i18nRegisterPage
}
const RegisterComplete: React.FC<RegisterCompleteProps> = ({i18n}) => (
  <div>
    <Text element={'h1'} marginBottom={'space3x'}>
      {i18n.registrationSuccessful}
    </Text>
    <Text element={'h2'}>{i18n.checkYourEmail}</Text>
  </div>
)

export const RegisterComponent: React.FC<RegisterComponentProps> = (props) => {
  const {i18n, registrationComplete, error, onSubmit, isLoading} = props
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

    await handleSubmit(onSubmit)()
  }

  return (
    <Layout
      bubbleOnePositioning="top"
      bubbleTwoPositioning="right"
      backgroundColor="pureWhite"
    >
      <Content>
        <Box>
          <DogImage>
            <Image src="/dog-on-phone.svg" alt="dog on phone" fill />
          </DogImage>
        </Box>
        {!registrationComplete ? (
          <>
            <Text element={'h1'} marginBottom={'space3x'}>
              {i18n.heading}
            </Text>
            <Text element={'h2'} marginBottom={'space6x'}>
              {i18n.subHeading}
            </Text>
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

              <Text color={'red'} element={'p'}>
                {getPasswordFormatValidationMessage()}
                {error?.message}
              </Text>

              <Button
                disabled={isLoading}
                isLoading={isLoading}
                type="button"
                aria-label="Submit"
                onClick={handleSubmitForm}
              >
                {i18n.submitButton}
              </Button>

              <Box centerContent direction={'column'} marginTop={'space2x'}>
                <Text marginBottom={'space1x'}>
                  {i18n.signIn}
                  <TextButton colour={'pink'} href={'/auth/login'}>
                    {i18n.signInAction}
                  </TextButton>
                </Text>
                <Text>
                  {i18n.goHome}
                  <TextButton colour={'pink'} href={'/auth/login'}>
                    {i18n.goHomeAction}
                  </TextButton>
                </Text>
              </Box>
            </Form>
          </>
        ) : (
          <RegisterComplete i18n={i18n} />
        )}
      </Content>
    </Layout>
  )
}
