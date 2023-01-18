import {Box, Layout, Text, TextButton} from '@clubwoof-components'
import Image from 'next/image'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {FormDetails} from '../register'
import {formSchema, inputs} from './form-helpers'
import {Content, DogImage, Form, FormInput, SubmitButton} from './login.styles'
import React, {SyntheticEvent} from 'react'
import {useFormHelpers} from '@clubwoof-hooks'

interface LoginProps {
  i18n: i18nLoginPage
  loginUser: (data: FormDetails) => void
  error: string | undefined
  isLoading: boolean
  resetState: () => void
}
export const LoginComponent: React.FC<LoginProps> = (props) => {
  const {i18n, loginUser, error, resetState} = props
  const formInputs = inputs(i18n)
  const {control, handleSubmit, formState, reset} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema(i18n)),
  })

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
      reset()
    }
  }

  return (
    <Layout backgroundColor={'pink'} languageSelectionTextColour={'pureWhite'}>
      <Content>
        <DogImage>
          <Image src={'/dog-in-box.png'} alt={'dog in a box'} fill />
        </DogImage>
        <Text color={'pureWhite'} element={'h1'} marginBottom={'space2x'}>
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

          <Text color={'pureWhite'} marginBottom={'space1x'}>
            {error && error}
          </Text>

          <SubmitButton type={'button'} onClick={handleSubmitForm}>
            Let&apos;s go!
          </SubmitButton>

          <Box direction={'column'} marginTop={'space2x'} centerContent>
            <Text color={'pureWhite'} marginBottom={'space1x'}>
              Forgot your password?{' '}
              <TextButton colour={'yellow'} href={'/auth/forgot-password'}>
                Click here
              </TextButton>
            </Text>
            <Text color={'pureWhite'}>
              New to clubwoof?{' '}
              <TextButton colour={'yellow'} href={'/auth/register'}>
                Get started
              </TextButton>
            </Text>
          </Box>
        </Form>
      </Content>
    </Layout>
  )
}
