import {Button, Layout, Text, TextInput} from '@clubwoof-components'
import React, {SyntheticEvent} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {formSchema, inputs} from './form-helpers'
import {useFormHelpers} from '@clubwoof-hooks'
import {Content} from './resend-registration-link.styles'
import {yupResolver} from '@hookform/resolvers/yup'

interface ResendRegistrationLinkProps {
  i18n: i18nResendRegistrationLink
  clearErrors: () => void
  resendRegistrationLink: (data: FormDetails) => void
  error: string | undefined
  linkSentSuccessfully: boolean
}

export const ResendRegistrationLinkComponent: React.FC<ResendRegistrationLinkProps> = (
  props,
) => {
  const {i18n, clearErrors, resendRegistrationLink, error, linkSentSuccessfully} = props

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

    await handleSubmit(resendRegistrationLink)()
  }

  return (
    <Layout bubbleOnePositioning={'top'} bubbleTwoPositioning={'right'}>
      <Content>
        <Text element={'h1'} marginBottom={'space2x'}>
          {i18n.heading}
        </Text>
        <Text element={'h3'} marginBottom={'space6x'}>
          {i18n.subHeading}
        </Text>

        <form>
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

          <Text color={'red'} marginBottom={'space1x'}>
            {error && error}
          </Text>

          <Text color={'pink'} marginBottom={'space1x'}>
            {linkSentSuccessfully &&
              'The registration link has been sent. Go ahead and check your inbox!'}
          </Text>

          <Button aria-label={'Submit'} onClick={handleSubmitForm}>
            {i18n.submitButton}
          </Button>
        </form>
      </Content>
    </Layout>
  )
}
