import React, {SyntheticEvent, useEffect, useState} from 'react'
import Link from 'next/link'
import {Box} from 'grommet'
import {Controller, FieldValues, useForm} from 'react-hook-form'
import {Auth} from '@aws-amplify/auth'

import {Layout, Text, TextInput} from '@clubwoof-components'
import {useMediaQueries} from '@clubwoof-hooks'
import {colors} from '@clubwoof-styles'

import {
  Container,
  DogImage,
  ErrorMessage,
  Form,
  Heading,
  HeadingContainer,
  LinkText,
  Logo,
  SubHeading,
  SubmitButton,
} from './register.styles'
import {formSchema, inputs} from './form-helpers'
import {yupResolver} from '@hookform/resolvers/yup'

interface FormDetails extends FieldValues {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
}

const RegisterComplete: React.FC = () => (
  <div>
    <Text element={'h1'} paddingBottom={'space2x'}>
      You have successfully register to the club!
    </Text>
    <Text element={'h2'}>Go ahead and check your email to confirm your account.</Text>
  </div>
)

export const Register: React.FC = () => {
  const {isMobile} = useMediaQueries()
  const {control, handleSubmit, formState, reset} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  })

  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

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

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (Object.keys(formState.errors).length > 0) return

    await handleSubmit(registerUser)()
  }

  // eslint-disable-next-line
  const isCognitoError = (obj: any): obj is CognitoError => {
    return 'code' in obj && 'message' in obj && 'name' in obj
  }

  const registerUser = async (data: FormDetails) => {
    setError('')
    if (data.firstName && data.lastName && data.email && data.password) {
      try {
        const result = await Auth.signUp({
          username: data.email.trim().toLowerCase(),
          password: data.password,
          attributes: {
            given_name: data.firstName.trim().toLowerCase(),
            family_name: data.lastName.trim().toLowerCase(),
          },
        })
        console.log(result)

        localStorage.setItem('TEMP_PASSWORD', data.password)
        setRegistrationComplete(true)
        reset()
      } catch (e) {
        if (isCognitoError(e)) {
          console.log(e)
          setError(e.message)
        } else setError('Something has gone very wrong, please try again later.')
      }
    }
  }
  const getPasswordFormatValidationMessage = () => {
    const {errors} = formState
    if (Object.keys(errors).length === 0) return ''
    const errorMessage = `${errors['password']?.message}`
    if (!errorMessage) return ''
    if (errorMessage && errorMessage.includes('contain')) return errorMessage
    return ''
  }

  const getInputErrorMessage = (inputName: string) => {
    const errorMessage = formState.errors[inputName]?.message
    if (!errorMessage) return ''
    return (errorMessage as string).includes('contain') ? '' : `${errorMessage}`
  }

  return (
    <Layout
      bubbleOnePositioning="top"
      bubbleTwoPositioning="right"
      backgroundColor="pureWhite"
    >
      <Container>
        {!isMobile && <Logo src="/logo.png" alt="logo" height={140} width={140} />}
        <Box align="center">
          <DogImage
            src="/dog-on-phone.svg"
            alt="dog on phone"
            height={isMobile ? 140 : 200}
            width={isMobile ? 180 : 200}
          />
        </Box>
        {!registrationComplete ? (
          <>
            <HeadingContainer>
              <Heading>Hello Hooman, it&apos;s nice to meet you!</Heading>
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
                        onKeyDown={(e) => handleKeyPress(e, index + 1)}
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
                {getPasswordFormatValidationMessage() &&
                  getPasswordFormatValidationMessage()}
                {error}
              </ErrorMessage>

              <SubmitButton type="button" aria-label="Submit" onClick={handleClick}>
                Get started!
              </SubmitButton>

              <Box align="center">
                <LinkText>
                  Already part of the club? <Link href="/account/login">Sign in</Link>
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
