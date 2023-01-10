import React, {SyntheticEvent, useEffect, useState} from 'react'
import Link from 'next/link'
import {Box} from 'grommet'
import {Controller, FieldValues, useForm} from 'react-hook-form'
import {Auth} from '@aws-amplify/auth'

import {Layout, TextInput} from '@clubwoof-components'
import {useMediaQueries} from '@clubwoof-hooks'
import {colors} from '@clubwoof-styles'

import {
  Container,
  DogImage,
  FormContainer,
  Heading,
  HeadingContainer,
  LoginText,
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

export const Register: React.FC = () => {
  const {isMobile} = useMediaQueries()
  const {control, handleSubmit, formState, reset} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  })

  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()

  useEffect(() => {
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
  }, [])

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
    console.log({formState})
    if (Object.keys(formState.errors).length > 0) return

    await handleSubmit(submitForm)()
  }

  const submitForm = async (data: FormDetails) => {
    console.log('BLAHHH::::::', formState.errors)
    if (data.firstName && data.lastName && data.email && data.password) {
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
      reset()
    }
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
            width={isMobile ? 140 : 200}
          />
        </Box>
        <HeadingContainer>
          <Heading>Hello Hooman, it&apos;s nice to meet you!</Heading>
          <SubHeading>Register today and join the club</SubHeading>
        </HeadingContainer>
        <FormContainer>
          <form>
            {inputs.map((input, index) => (
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
                    error={
                      formState.errors[input.name]?.message &&
                      `${formState.errors[input.name]?.message}`
                    }
                  />
                )}
                name={input.name}
                control={control}
                defaultValue=""
              />
            ))}

            <SubmitButton type="button" aria-label="Submit" onClick={handleClick}>
              Get started!
            </SubmitButton>

            <Box align="center">
              <LoginText>
                Already part of the club? <Link href="/account/login">Sign in</Link>
              </LoginText>
            </Box>
          </form>
        </FormContainer>
      </Container>
    </Layout>
  )
}
