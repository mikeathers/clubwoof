import React, {SyntheticEvent, useEffect, useState} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import Link from 'next/link'
import {Box} from 'grommet'
import {Controller, useForm} from 'react-hook-form'
import Image from 'next/image'

import {Layout, Text, TextInput} from '@clubwoof-components'
import {colors} from '@clubwoof-styles'

import {formSchema, inputs} from './form-helpers'
import {
  Container,
  DogImage,
  ErrorMessage,
  Form,
  Heading,
  HeadingContainer,
  LinkText,
  SubHeading,
  SubmitButton,
} from './register.styles'
import {FormDetails} from './register.container'

export interface RegisterComponentProps {
  i18n: i18nRegisterPage
  error: string
  registrationComplete: boolean
  registerUser: (data: FormDetails) => Promise<void>
}

const RegisterComplete: React.FC = () => (
  <div>
    <Text element={'h1'} paddingBottom={'space2x'}>
      You&apos;ve successfully registered to the club!
    </Text>
    <Text element={'h2'}>Go ahead and check your email to confirm your account.</Text>
  </div>
)

export const RegisterComponent: React.FC<RegisterComponentProps> = (props) => {
  const {i18n, registrationComplete, error, registerUser} = props

  const {control, handleSubmit, formState} = useForm<FormDetails>({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  })

  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()

  useEffect(() => {
    addInteractiveFieldsToState()
  }, [])

  const addInteractiveFieldsToState = () => {
    const firstNameInput = document.querySelector(
      '[aria-label="First name"]',
    ) as HTMLInputElement
    const lastNameInput = document.querySelector(
      '[aria-label="Last name"]',
    ) as HTMLInputElement
    const emailInput = document.querySelector('[aria-label="Email"]') as HTMLInputElement
    const passwordInput = document.querySelector(
      '[aria-label="Password"]',
    ) as HTMLInputElement
    const confirmPasswordInput = document.querySelector(
      '[aria-label=" Confirm password"]',
    ) as HTMLInputElement
    const submitButtonElement = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement

    setInputLabels([
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ])
    setSubmitButton(submitButtonElement)
  }

  const handleSubmitForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (Object.keys(formState.errors).length > 0) return

    await handleSubmit(registerUser)()
  }
  const getInputErrorMessage = (inputName: string) => {
    const errorMessage = formState.errors[inputName]?.message
    if (!errorMessage) return ''
    return (errorMessage as string).includes('contain') ? '' : `${errorMessage}`
  }

  const getPasswordFormatValidationMessage = () => {
    const {errors} = formState
    if (Object.keys(errors).length === 0) return ''
    const errorMessage = `${errors['password']?.message}`
    if (!errorMessage) return ''
    if (errorMessage && errorMessage.includes('contain')) return errorMessage
    return ''
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter') {
      if (index < inputs.length) {
        const input = inputLabels[index]
        if (input) {
          input.focus()
        }
      }
      if (index === inputs.length) {
        if (submitButton) {
          submitButton.focus()
        }
      }
    }
  }

  return (
    <Layout
      bubbleOnePositioning="top"
      bubbleTwoPositioning="right"
      backgroundColor="pureWhite"
    >
      <Container>
        <Box align="center">
          <DogImage>
            <Image src="/dog-on-phone.svg" alt="dog on phone" fill />
          </DogImage>
        </Box>
        {!registrationComplete ? (
          <>
            <HeadingContainer>
              <Heading>{i18n.heading}</Heading>
              <SubHeading>Register today and join the club</SubHeading>
            </HeadingContainer>
            <Form>
              {inputs.map((input, index) => {
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
                        withoutBorder
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
                Get started!
              </SubmitButton>

              <Box align="center">
                <LinkText>
                  Already part of the club? <Link href="/auth/login">Sign in</Link>
                </LinkText>
                <LinkText>
                  All done? <Link href="/">Go home</Link>
                </LinkText>
              </Box>
            </Form>
          </>
        ) : (
          <RegisterComplete />
        )}
      </Container>
    </Layout>
  )
}
