import { Box } from 'grommet'
import { ContactInfo, Lock, MailOption } from 'grommet-icons'
import Image from 'next/image'
import { Layout } from '@clubwoof-components'
import { colors } from '@clubwoof-styles'
import { useMediaQueries } from '@clubwoof-hooks'

import {
  Container,
  FormInput,
  Heading,
  RegisterForm,
  SubmitButton,
} from './register.styles'

export const Register = () => {
  const { isMobile } = useMediaQueries()
  const pageWidth = isMobile ? 'fullScreen' : 'narrow'

  return (
    <Layout backgroundColor={'pureWhite'} width={pageWidth}>
      <Container>
        <Image src="/logo.png" alt={'logo'} width={150} height={140} />
        <Heading>Hello Hooman, it&apos;s nice to meet you!</Heading>
        <Box gap="medium" width="medium">
          <RegisterForm>
            <FormInput
              icon={<ContactInfo color={colors.lightBlue} />}
              aria-label={'First name'}
              name={'first name'}
              type="name"
              placeholder={'Joe'}
            />
            <FormInput
              icon={<ContactInfo color={colors.lightBlue} />}
              aria-label={'Last name'}
              name={'last name'}
              type="name"
              placeholder={'Smith'}
            />
            <FormInput
              icon={<MailOption color={colors.lightBlue} />}
              aria-label={'Email'}
              name={'email'}
              type="email"
              placeholder={'joesmith@email.com'}
            />
            <FormInput
              icon={<Lock color={colors.lightBlue} />}
              aria-label={'Password'}
              name={'password'}
              type="password"
              placeholder={'*******'}
            />
            <Box gap="medium" width="small">
              <SubmitButton size={'large'} type={'submit'} label={"Let's go!"} />
            </Box>
          </RegisterForm>
        </Box>
      </Container>
    </Layout>
  )
}
