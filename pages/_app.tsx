/* eslint-disable */
import {Auth} from '@aws-amplify/auth'
import type {AppProps} from 'next/app'
import Head from 'next/head'

import {AuthProvider} from '@clubwoof-context'
import {ErrorBoundary} from '@clubwoof-components'
import {dev} from '@clubwoof-constants'

import '../frontend/styles/globals.css'
import {useTranslation} from 'next-export-i18n'

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  userPoolId: dev.USER_POOL_ID,
  identityPoolId: dev.IDENTITY_POOL_ID,
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})

function App({Component, pageProps}: AppProps) {
  const {t} = useTranslation()

  return (
    <ErrorBoundary i18n={t('pages.errorPage')}>
      <Head>
        <title>clubwoof | your dog, our playground </title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
