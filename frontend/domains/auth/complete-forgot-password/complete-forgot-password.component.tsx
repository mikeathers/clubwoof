import React, {SyntheticEvent} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {Button, Form, Layout, Text, TextInput} from '@clubwoof-components'
import {useFormHelpers} from '@clubwoof-hooks'
import {colors} from '@clubwoof-styles'

import {Content} from './complete-forgot-password.styles'
import {formSchema, inputs} from './form-helpers'

export interface CompleteForgotPasswordComponentProps {
  i18n: i18nCompleteForgotPasswordPage
  error: string | undefined
  isLoading: boolean
  clearErrors: () => void
  updatePassword: (data: FormDetails) => void
}
export const CompleteForgotPasswordComponent: React.FC<
  CompleteForgotPasswordComponentProps
> = (props) => {
  const {i18n, error, isLoading, clearErrors, updatePassword} = props

  const {control, handleSubmit, formState} = useForm<FormDetails>({
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

    console.log({formHasErrors})
    if (formHasErrors) return

    clearErrors()

    await handleSubmit(updatePassword)()
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
            {error && error}
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
        </Form>
      </Content>
    </Layout>
  )
}
