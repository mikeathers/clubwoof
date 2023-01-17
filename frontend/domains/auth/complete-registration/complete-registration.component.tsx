import Image from 'next/image'
import {Box, Layout, Text, TextButton} from '@clubwoof-components'
import {DogImage} from './complete-registration.styles'

export interface CompleteRegistrationComponentProps {
  loginSuccessful: boolean
  i18n: i18nCompleteRegistrationPage
}
export const CompleteRegistrationComponent: React.FC<
  CompleteRegistrationComponentProps
> = (props) => {
  const {loginSuccessful, i18n} = props

  if (loginSuccessful) {
    return (
      <Layout backgroundColor={'pink'} languageSelectionTextColour={'pureWhite'}>
        <Box direction={'column'} centerContent>
          <DogImage>
            <Image src={'/dog-on-skateboard.png'} alt={'dog on skateboard'} fill />
          </DogImage>
          <Box direction={'column'} centerContent padding={'space2x'}>
            <Text element={'h1'} color={'pureWhite'} paddingBottom={'space2x'}>
              {i18n.thanksForRegisteringText}
            </Text>
            <Text element={'h3'} color={'pureWhite'}>
              {i18n.weWillBeInTouchText}
            </Text>
            <Text element={'h3'} color={'pureWhite'}>
              {i18n.fillInYourDetailsText}
            </Text>
            <TextButton
              padding={'space2x'}
              href={'/account/details'}
              colour={'pureWhite'}
              underline
            >
              Help us get to know you
            </TextButton>
          </Box>
        </Box>
      </Layout>
    )
  }
  return <div>complete reg</div>
}
