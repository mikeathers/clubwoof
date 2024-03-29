import React, {SyntheticEvent} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'

import {Button, Form, Layout, Text, TextInput} from '@clubwoof-components'
import {useFormHelpers} from '@clubwoof-hooks'

import {formSchema, inputs} from './form-helpers'
import {Content} from './resend-registration-link.styles'

export interface ResendRegistrationLinkProps {
  i18n: i18nResendRegistrationLinkPage
  clearErrors: () => void
  resendRegistrationLink: (data: FormDetails) => void
  error: string | undefined
  linkSentSuccessfully: boolean
  isLoading: boolean
}

export const ResendRegistrationLinkComponent: React.FC<ResendRegistrationLinkProps> = (
  props,
) => {
  const {
    i18n,
    clearErrors,
    resendRegistrationLink,
    error,
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

    await handleSubmit(resendRegistrationLink)()
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
        </Form>
      </Content>
    </Layout>
  )
}
