import React from 'react'
import Image from 'next/image'

import {ROUTE_PATHS} from '@clubwoof-constants'
import {Content, Layout, Text, TextButton} from '@clubwoof-components'

import {DogImage} from './error-boundary.styles'

export const ErrorPage: React.FC = () => (
  <Layout backgroundColor={'pink'} showLanguageSelection={false}>
    <Content>
      <DogImage>
        <Image src={'/beagle.png'} alt={'beagle'} fill />
      </DogImage>
      <Text element={'h1'} color={'pureWhite'} marginBottom={'space3x'}>
        Ooops.. it looks like something went terribly wrong!
      </Text>
      <Text element={'h2'} color={'pureWhite'} marginBottom={'space3x'}>
        Let&apos;s get you back on the right path.
      </Text>
      <TextButton underline color={'pureWhite'} href={ROUTE_PATHS.LOGIN}>
        Go home
      </TextButton>
    </Content>
  </Layout>
)
