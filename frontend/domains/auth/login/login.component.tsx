import {Layout, Text, TextInput} from '@clubwoof-components'
import Image from 'next/image'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import {FormDetails} from '../register'
import {formSchema, inputs} from './form-helpers'
import {DogImage, Form} from './login.styles'
import {colors} from '@clubwoof-styles'
import React, {useEffect, useState} from 'react'

interface LoginProps {
  i18n: i18nLoginPage
}
export const Login: React.FC<LoginProps> = (props) => {
  const {i18n} = props
  const formInputs = inputs(i18n)
  const {control, handleSubmit, formState} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema(i18n)),
  })
  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()

  useEffect(() => {
    addInteractiveFieldsToState()
  }, [])

  const addInteractiveFieldsToState = () => {
    const emailInput = document.querySelector('[aria-label="Email"]') as HTMLInputElement

    const passwordInput = document.querySelector(
      '[aria-label="Password"]',
    ) as HTMLInputElement

    const submitButtonElement = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement

    setInputLabels([emailInput, passwordInput])
    setSubmitButton(submitButtonElement)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter') {
      if (index < formInputs.length) {
        const input = inputLabels[index]
        console.log({input, inputLabels, index})
        if (input) {
          input.focus()
        }
      }
      if (index === formInputs.length) {
        if (submitButton) {
          submitButton.focus()
        }
      }
    }
  }

  const getInputErrorMessage = (inputName: string) => {
    const errorMessage = formState.errors[inputName]?.message
    if (!errorMessage) return ''
    return (errorMessage as string).includes('contain') ? '' : `${errorMessage}`
  }

  return (
    <Layout
      width={'m'}
      backgroundColor={'pink'}
      languageSelectionTextColour={'pureWhite'}
    >
      <DogImage>
        <Image src={'/dog-in-box.png'} alt={'dog in a box'} fill />
      </DogImage>
      <Text color={'pureWhite'} element={'h1'} paddingBottom={'space2x'}>
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
                <TextInput
                  {...field}
                  icon={<input.icon color={colors.lightBlue} size="21" />}
                  aria-label={input.ariaLabel}
                  type={input.type}
                  placeholder={input.placeholder}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyPress(e, index + 1)
                  }
                  ref={null}
                  error={errorMessage && errorMessage}
                  color={'pureWhite'}
                />
              )}
              name={input.name}
              control={control}
              defaultValue=""
            />
          )
        })}
      </Form>
    </Layout>
  )
}
