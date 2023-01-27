import React, {SyntheticEvent} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {
  Box,
  Button,
  Form,
  Layout,
  Text,
  TextButton,
  TextInput,
} from '@clubwoof-components'
import {useFormHelpers} from '@clubwoof-hooks'
import {ROUTE_PATHS} from '@clubwoof-constants'

import {formSchema, inputs} from '../resend-registration-link/form-helpers'
import {Content} from './forgot-password.styles'

export interface ForgotPasswordComponentProps {
  i18n: i18nForgotPasswordPage
  clearErrors: () => void
  sendForgotPasswordLink: (data: FormDetails) => void
  error: string | undefined
  linkSentSuccessfully: boolean
  isLoading: boolean
}

export const ForgotPasswordComponent: React.FC<ForgotPasswordComponentProps> = (
  props,
) => {
  const {
    i18n,
    error,
    clearErrors,
    sendForgotPasswordLink,
    linkSentSuccessfully,
    isLoading,
  } = props

  const {control, formState, handleSubmit} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema(i18n)),
  })

  const formInputs = inputs(i18n)

  const {jumpToNextInputOnEnter, getInputErrorMessage, formHasErrors} = useFormHelpers({
    formInputs,
    formState,
  })

  const handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (formHasErrors) return

    clearErrors()

    await handleSubmit(sendForgotPasswordLink)()
  }

  return (
    <Layout bubbleOnePositioning={'top'} bubbleTwoPositioning={'right'}>
      <Content>
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
                  />
                )}
                name={input.name}
                control={control}
                defaultValue=""
              />
            )
          })}
          <Text color={error ? 'red' : 'pink'} marginBottom={'space1x'}>
            {error && !linkSentSuccessfully && error}
            {linkSentSuccessfully && i18n.successMessage}
          </Text>

          <Button aria-label={'Submit'} onClick={handleSubmitForm} isLoading={isLoading}>
            {i18n.submitButton}
          </Button>

          <Box direction={'column'} marginTop={'space2x'} centerContent>
            <Text marginBottom={'space1x'}>
              {i18n.login}{' '}
              <TextButton colour={'pink'} href={ROUTE_PATHS.LOGIN}>
                {i18n.loginAction}
              </TextButton>
            </Text>
          </Box>
        </Form>
      </Content>
    </Layout>
  )
}
