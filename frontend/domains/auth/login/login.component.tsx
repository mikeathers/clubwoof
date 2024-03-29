import React, {SyntheticEvent, useEffect} from 'react'
import Image from 'next/image'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {Box, Form, Layout, Text, TextButton} from '@clubwoof-components'
import {useFormHelpers, useSafeAsync} from '@clubwoof-hooks'

import {formSchema, inputs} from './form-helpers'
import {Content, DogImage, FormInput, SubmitButton} from './login.styles'
import {ROUTE_PATHS} from '@clubwoof-constants'

interface LoginProps {
  i18n: i18nLoginPage
  loginUser: (data: FormDetails) => void
  error: string | undefined
  isLoading: boolean
  clearErrors: () => void
}
export const LoginComponent: React.FC<LoginProps> = (props) => {
  const {i18n, loginUser, error, clearErrors, isLoading} = props
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

  return (
    <Layout backgroundColor={'pink'} languageSelectionTextColour={'pureWhite'}>
      <Content>
        <DogImage>
          <Image src={'/dog-in-box.png'} alt={'dog in a box'} fill />
        </DogImage>
        <Text element={'h1'} color={'pureWhite'} marginBottom={'space3x'}>
          {i18n.heading}
        </Text>
        <Text element={'h2'} color={'pureWhite'} marginBottom={'space6x'}>
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
                      clearErrors()
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
              <TextButton color={'yellow'} href={ROUTE_PATHS.FORGOT_PASSWORD}>
                {i18n.forgotYourPasswordAction}
              </TextButton>
            </Text>
            <Text color={'pureWhite'}>
              {i18n.signUp}{' '}
              <TextButton color={'yellow'} href={ROUTE_PATHS.REGISTER}>
                {i18n.signUpAction}
              </TextButton>
            </Text>
          </Box>
        </Form>
      </Content>
    </Layout>
  )
}
