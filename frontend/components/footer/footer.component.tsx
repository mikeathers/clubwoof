import {Container, LeftContainer, Logo, RightContainer} from './footer.styles'
import Image from 'next/image'
import {Text} from '../text'
import {Box} from '../box'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <Container>
      <Box>
        <LeftContainer>
          <Logo>
            <Image src={'/logo.png'} alt={'clubwoof logo'} fill />
          </Logo>
        </LeftContainer>
        <RightContainer></RightContainer>
      </Box>

      <Box>
        <Text element={'p'} fontSize={'s'}>
          {`Copyright © ${currentYear} All rights reserved`}
        </Text>
      </Box>
    </Container>
  )
}
