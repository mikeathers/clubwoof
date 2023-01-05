import Link from 'next/link'
import { Box } from 'grommet'
import React, { SyntheticEvent, useEffect, useState } from 'react'

import { Layout, TextInput } from '@clubwoof-components'
import { useMediaQueries } from '@clubwoof-hooks'
import {
  Container,
  DogImage,
  FormContainer,
  Heading,
  HeadingContainer,
  LoginText,
  SubHeading,
  SubmitButton,
} from './register.styles'
import { colors } from '@clubwoof-styles'
import { inputs } from './inputs'
import { Controller, FieldValues, useForm } from 'react-hook-form'

export const Register = () => {
  const { isMobile } = useMediaQueries()
  const { control, handleSubmit, formState } = useForm()
  const [inputLabels, setInputLabels] = useState<(HTMLInputElement | null)[]>([])
  const [submitButton, setSubmitButton] = useState<HTMLButtonElement>()
  const inputPattern = (inputName: string) => {
    if (inputName === 'email') {
      return {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address e.g. joe@gmail.com',
      }
    }
    return undefined
  }
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
    const submitButton = document.querySelector(
      '[aria-label="Submit"]',
    ) as HTMLButtonElement

    setInputLabels([firstNameInput, lastNameInput, emailInput, passwordInput])
    setSubmitButton(submitButton)
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

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('submitted')
    if (Object.keys(formState.errors).length > 0) return
    else {
      handleSubmit(submitForm)()
    }
  }

  const submitForm = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <Layout
      bubbleOnePositioning={'top'}
      bubbleTwoPositioning={'right'}
      backgroundColor={'pureWhite'}
    >
      <Container>
        <Box align={'center'}>
          <DogImage
            src={'/dog-on-phone.svg'}
            alt={'dog on phone'}
            height={isMobile ? 140 : 200}
            width={isMobile ? 140 : 200}
          />
        </Box>
        <HeadingContainer>
          <Heading>Hello Hooman, it&apos;s nice to meet you!</Heading>
          <SubHeading>Register today and join the club!</SubHeading>
        </HeadingContainer>
        <FormContainer>
          <form>
            {inputs.map((input, index) => (
              <Controller
                key={index}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    icon={<input.icon color={colors.lightBlue} size={'21'} />}
                    aria-label={input.ariaLabel}
                    type={input.type}
                    placeholder={input.placeholder}
                    onKeyDown={(e) => handleKeyPress(e, index + 1)}
                    withoutBorder={true}
                    ref={null}
                    error={
                      formState.errors[input.name]?.message &&
                      `${formState.errors[input.name]?.message}`
                    }
                  />
                )}
                name={input.name}
                control={control}
                defaultValue={''}
                rules={{
                  required: `${input.ariaLabel} is required`,
                  pattern: inputPattern(input.name),
                }}
              />
            ))}

            <SubmitButton type={'button'} aria-label={'Submit'} onClick={handleClick}>
              Get started!
            </SubmitButton>

            <Box align={'center'}>
              <LoginText>
                Already part of the club? <Link href={'/account/login'}>Sign in</Link>
              </LoginText>
            </Box>
          </form>
        </FormContainer>
      </Container>
    </Layout>
  )
}
