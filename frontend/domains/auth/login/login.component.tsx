import React, {SyntheticEvent, useEffect} from 'react'
import Image from 'next/image'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {Box, Layout, Text, TextButton} from '@clubwoof-components'
import {useFormHelpers} from '@clubwoof-hooks'

import {FormDetails} from '../register'
import {formSchema, inputs} from './form-helpers'
import {useSafeAsync} from '../../../hooks/use-safe-async'
import {Content, DogImage, Form, FormInput, SubmitButton} from './login.styles'

interface LoginProps {
  i18n: i18nLoginPage
  loginUser: (data: FormDetails) => void
  error: string | undefined
  isLoading: boolean
  resetState: () => void
}
export const LoginComponent: React.FC<LoginProps> = (props) => {
  const {i18n, loginUser, error, resetState, isLoading} = props
  const {control, handleSubmit, formState, reset} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema(i18n)),
  })
  const {isSuccess} = useSafeAsync()

  const formInputs = inputs(i18n)

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess])

  const {jumpToNextInputOnEnter, getInputErrorMessage, formHasErrors} = useFormHelpers({
    formInputs,
    formState,
  })

  const handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (formHasErrors) return

    await handleSubmit(loginUser)()
  }

  const handleClearError = () => {
    if (error !== undefined) {
      resetState()
    }
  }

  return (
    <Layout backgroundColor={'pink'} languageSelectionTextColour={'pureWhite'}>
      <Content>
        <DogImage>
          <Image src={'/dog-in-box.png'} alt={'dog in a box'} fill />
        </DogImage>
        <Text
          color={'pureWhite'}
          element={'h1'}
          fontSize={'xxxxl'}
          marginBottom={'space3x'}
        >
          {i18n.heading}
        </Text>
        <Text element={'h3'} color={'pureWhite'}>
          {i18n.subHeading}
        </Text>
        <Form>
          {formInputs.map((input, index) => {
            const errorMessage = getInputErrorMessage(input.name)
            return (
              <Controller
                key={index}
                render={({field}) => (
                  <FormInput
                    {...field}
                    icon={<input.icon size="21" />}
                    aria-label={input.ariaLabel}
                    type={input.type}
                    placeholder={input.placeholder}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      jumpToNextInputOnEnter(e, index + 1)
                      handleClearError()
                    }}
                    ref={null}
                    error={errorMessage && errorMessage}
                    errorColor={'yellow'}
                    color={'pureWhite'}
                  />
                )}
                name={input.name}
                control={control}
                defaultValue=""
              />
            )
          })}

          <Text color={'pureWhite'} fontWeight={'bold'} marginBottom={'space1x'}>
            {error && error}
          </Text>

          <SubmitButton
            disabled={isLoading}
            isLoading={isLoading}
            type={'button'}
            aria-label={'Submit'}
            onClick={handleSubmitForm}
          >
            {i18n.submitButton}
          </SubmitButton>

          <Box direction={'column'} marginTop={'space2x'} centerContent>
            <Text color={'pureWhite'} marginBottom={'space1x'}>
              {i18n.forgotYourPassword}{' '}
              <TextButton colour={'yellow'} href={'/auth/forgot-password'}>
                {i18n.forgotYourPasswordAction}
              </TextButton>
            </Text>
            <Text color={'pureWhite'}>
              {i18n.signUp}{' '}
              <TextButton colour={'yellow'} href={'/auth/register'}>
                {i18n.signUpAction}
              </TextButton>
            </Text>
          </Box>
        </Form>
      </Content>
    </Layout>
  )
}
