import { HiUser } from 'react-icons/hi2'
import { HiAtSymbol } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'
import { Layout } from '@clubwoof-components'
import { colors } from '@clubwoof-styles'
import { useMediaQueries } from '@clubwoof-hooks'

import {
  Container,
  DogImage,
  FormContainer,
  FormInput,
  Heading,
  HeadingContainer,
  LoginText,
  RegisterForm,
  SubHeading,
  SubmitButton,
} from './register.styles'
import Link from 'next/link'
import { Box } from 'grommet'

export const Register = () => {
  const { isMobile } = useMediaQueries()

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
          <RegisterForm>
            <FormInput
              icon={<HiUser color={colors.lightBlue} size={'21'} />}
              aria-label={'First name'}
              name={'first name'}
              type="name"
              placeholder={'First name'}
            />
            <FormInput
              icon={<HiUser color={colors.lightBlue} size={'21'} />}
              aria-label={'Last name'}
              name={'last name'}
              type="name"
              placeholder={'Last name'}
            />
            <FormInput
              icon={<HiAtSymbol color={colors.lightBlue} size={'21'} />}
              aria-label={'Email'}
              name={'email'}
              type="email"
              placeholder={'Email'}
            />
            <FormInput
              icon={<BiLockAlt color={colors.lightBlue} size={'21'} />}
              aria-label={'Password'}
              name={'password'}
              type="password"
              placeholder={'Password'}
            />

            <SubmitButton size={'large'} type={'submit'} label={'Get started!'} />
            <Box align={'center'}>
              <LoginText>
                Already part of the club? <Link href={'/account/login'}>Sign in</Link>
              </LoginText>
            </Box>
          </RegisterForm>
        </FormContainer>
      </Container>
    </Layout>
  )
}
