import Image from 'next/image'
import {Box, Layout, Text} from '@clubwoof-components'
import {DogImage} from './complete-registration.styles'

export interface CompleteRegistrationComponentProps {
  loginSuccessful: boolean
  i18n: i18nCompleteRegistrationPage
}
export const CompleteRegistrationComponent: React.FC<
  CompleteRegistrationComponentProps
> = (props) => {
  const {loginSuccessful} = props

  if (loginSuccessful) {
    return (
      <Layout backgroundColor={'pink'} textColour={'pureWhite'}>
        <Box direction={'column'} centerContent>
          <DogImage>
            <Image src={'/dog-on-skateboard.png'} alt={'dog on skateboard'} fill />
          </DogImage>
          <Box direction={'column'} centerContent padding={'space2x'}>
            <Text element={'h1'} color={'pureWhite'} paddingBottom={'space2x'}>
              Thanks for registering!
            </Text>
            <Text element={'h3'} color={'pureWhite'}>
              if you feel like filling in some details to help us better understand your
              needs then click the link below!
            </Text>
          </Box>
        </Box>
      </Layout>
    )
  }
  return <div>complete reg</div>
}
