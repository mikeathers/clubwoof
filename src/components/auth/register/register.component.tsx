import { Box, FormField, TextInput } from 'grommet'
import { ContactInfo, Lock, MailOption } from 'grommet-icons'
import Image from 'next/image'
import { Layout } from '@clubwoof-components'
import { colors } from '@clubwoof-styles'
import { useMediaQueries } from '@clubwoof-hooks'

import { Container, Heading, RegisterForm, SubmitButton } from './register.styles'

export const Register = () => {
  const { isMobile } = useMediaQueries()
  const pageWidth = isMobile ? 'fullScreen' : 'narrow'

  return (
    <Layout backgroundColor={'offWhite'} width={pageWidth}>
      <Container>
        <Image src="/logo.png" alt={'logo'} width={150} height={140} />
        <Heading>Hello Hooman, it&apos;s nice to meet you!</Heading>
        <Box gap="medium" width="medium">
          <RegisterForm>
            <FormField label={'First name'} name={'first name'} required>
              <TextInput
                icon={<ContactInfo color={colors.lightBlue} />}
                aria-label={'First name'}
                name={'first name'}
                type="name"
                placeholder={'Joe'}
              />
            </FormField>
            <FormField label={'Last name'} name={'last name'} required>
              <TextInput
                icon={<ContactInfo color={colors.lightBlue} />}
                aria-label={'Last name'}
                name={'last name'}
                type="name"
                placeholder={'Smith'}
              />
            </FormField>
            <FormField label={'Email'} name={'email'} required>
              <TextInput
                icon={<MailOption color={colors.lightBlue} />}
                aria-label={'Email'}
                name={'email'}
                type="email"
                placeholder={'joesmith@email.com'}
              />
            </FormField>
            <FormField label={'Password'} name={'password'} required>
              <TextInput
                icon={<Lock color={colors.lightBlue} />}
                aria-label={'Password'}
                name={'password'}
                type="password"
                placeholder={'*******'}
              />
            </FormField>
            <Box gap="medium" width="small">
              <SubmitButton size={'large'} type={'submit'} label={"Let's go!"} />
            </Box>
          </RegisterForm>
        </Box>
      </Container>
    </Layout>
  )
}
