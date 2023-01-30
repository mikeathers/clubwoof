import React from 'react'
import Image from 'next/image'

import {ROUTE_PATHS} from '@clubwoof-constants'
import {Content, Layout, Text, TextButton} from '@clubwoof-components'

import {DogImage} from './error-boundary.styles'

interface ErrorBoundaryComponentProps {
  i18n: i18nErrorPage
}

export const ErrorBoundaryComponent: React.FC<ErrorBoundaryComponentProps> = (props) => {
  const {i18n} = props
  const heading = i18n.heading
    ? i18n.heading
    : 'Ooops.. it looks like something went terribly wrong!'
  const subHeading = i18n.subHeading
    ? i18n.subHeading
    : 'Let&apos;s get you back on the right path.'
  const goHome = i18n.goHome ? i18n.goHome : 'Go home'
  return (
    <Layout backgroundColor={'pink'} showLanguageSelection={false}>
      <Content>
        <DogImage>
          <Image src={'/beagle.png'} alt={'beagle'} fill />
        </DogImage>
        <Text element={'h1'} color={'pureWhite'} marginBottom={'space3x'}>
          {heading}
        </Text>
        <Text element={'h2'} color={'pureWhite'} marginBottom={'space3x'}>
          {subHeading}
        </Text>
        <TextButton underline color={'pureWhite'} href={ROUTE_PATHS.LOGIN}>
          {goHome}
        </TextButton>
      </Content>
    </Layout>
  )
}
