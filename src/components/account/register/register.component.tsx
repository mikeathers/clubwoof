import Link from 'next/link'
import { Box } from 'grommet'
import React, { FormEvent } from 'react'

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
import { Controller, useForm } from 'react-hook-form'

export const Register = () => {
  const { isMobile } = useMediaQueries()
  const { control, handleSubmit, formState } = useForm()
  const firstNameInput = document.querySelector('[aria-label="First name"]')
  const lastNameInput = document.querySelector('[aria-label="Last name"]')
  const emailInput = document.querySelector('[aria-label="Email"]')
  const passwordInput = document.querySelector('[aria-label="Password"]')
  const submitButton = document.querySelector('[aria-label="Submit"]')

  const inputLabels = [firstNameInput, lastNameInput, emailInput, passwordInput]

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter') {
      if (index < inputs.length) {
        const input = inputLabels[index] as HTMLInputElement
        if (input) {
          input.focus()
        }
      }
      if (index === inputs.length) {
        const castedButton = submitButton as HTMLButtonElement
        if (castedButton) {
          castedButton.focus()
        }
      }
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(formState.errors).length > 0) return
    else {
      handleSubmit(submitForm)()
    }
  }

  const submitForm = () => {
    alert('FORM SUBMITTED')
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
          <form onSubmit={onSubmit}>
            {inputs.map((input, index) => (
              <div key={index}>
                <Controller
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      icon={<input.icon color={colors.lightBlue} size={'21'} />}
                      aria-label={input.ariaLabel}
                      type={input.type}
                      placeholder={input.placeholder}
                      onKeyDown={(e) => handleKeyPress(e, index + 1)}
                      withoutBorder={true}
                    />
                  )}
                  name={input.name}
                  control={control}
                  defaultValue={''}
                  rules={{ required: true }}
                />
                {formState.errors[input.name]?.type === 'required' && (
                  <p role="alert">{input.ariaLabel} is required</p>
                )}
              </div>
            ))}

            <SubmitButton type={'submit'} aria-label={'Submit'}>
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
