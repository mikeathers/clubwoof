import Image from 'next/image'
import {Box, Layout, Text, TextButton} from '@clubwoof-components'
import {DogImage} from './complete-registration.styles'

export interface CompleteRegistrationComponentProps {
  i18n: i18nCompleteRegistrationPage
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  error: Error | null | undefined
}
export const CompleteRegistrationComponent: React.FC<
  CompleteRegistrationComponentProps
> = (props) => {
  const {i18n} = props

  return (
    <Layout backgroundColor={'pink'} languageSelectionTextColour={'pureWhite'}>
      <Box direction={'column'} centerContent>
        <DogImage>
          <Image src={'/dog-on-skateboard.png'} alt={'dog on skateboard'} fill />
        </DogImage>
        <Box direction={'column'} centerContent padding={'space2x'}>
          <Text element={'h1'} color={'pureWhite'} marginBottom={'space2x'}>
            {i18n.thanksForRegistering}
          </Text>
          <Text element={'h2'} color={'pureWhite'}>
            {i18n.weWillBeInTouch}
          </Text>
          <Text element={'h2'} color={'pureWhite'}>
            {i18n.fillInYourDetails}
          </Text>
          <TextButton
            marginTop={'space1x'}
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
