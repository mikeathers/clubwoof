import React from 'react'
import Link from 'next/link'
import {Box} from 'grommet'
import {Controller} from 'react-hook-form'
import Image from 'next/image'

import {Layout, Text, TextInput} from '@clubwoof-components'
import {colors} from '@clubwoof-styles'

import {inputs} from './form-helpers'
import {useRegisterHook} from './use-register.hook'
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

const RegisterComplete: React.FC = () => (
  <div>
    <Text element={'h1'} paddingBottom={'space2x'}>
      You have successfully register to the club!
    </Text>
    <Text element={'h2'}>Go ahead and check your email to confirm your account.</Text>
  </div>
)

interface RegisterProps {
  i18n: i18nRegisterPage
}

export const Register: React.FC<RegisterProps> = (props) => {
  const {i18n} = props
  const {
    registrationComplete,
    error,
    control,
    handleSubmitForm,
    getInputErrorMessage,
    getPasswordFormatValidationMessage,
    handleKeyPress,
  } = useRegisterHook()

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
                {getPasswordFormatValidationMessage()}
                {error}
              </ErrorMessage>

              <SubmitButton type="button" aria-label="Submit" onClick={handleSubmitForm}>
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
