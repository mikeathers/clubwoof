import Image from 'next/image'
import {Box, Layout, Text} from '@clubwoof-components'
import {DogImage} from './complete-registration.styles'

interface CompleteRegistrationComponentProps {
  loginSuccessful: boolean
}
export const CompleteRegistrationComponent: React.FC<
  CompleteRegistrationComponentProps
> = (props) => {
  const {loginSuccessful} = props

  if (loginSuccessful) {
    return (
      <Layout backgroundColor={'pink'}>
        <DogImage>
          <Image src={'/dog-on-skateboard.png'} alt={'dog on skateboard'} fill />
        </DogImage>
        <Box>
          <Text element={'h1'} color={'pureWhite'}>
            Thanks for registering!
          </Text>
        </Box>
      </Layout>
    )
  }
  return <div>complete reg</div>
}
