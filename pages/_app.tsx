/* eslint-disable */
import {Auth} from '@aws-amplify/auth'
import type {AppProps} from 'next/app'
import Head from 'next/head'

import {AuthProvider} from '@clubwoof-context'

import {dev} from '../frontend/constants'
import '../frontend/styles/globals.css'

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  userPoolId: dev.USER_POOL_ID,
  identityPoolId: dev.IDENTITY_POOL_ID,
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})

function App({Component, pageProps}: AppProps) {
  console.log({dev})
  return (
    <>
      <Head>
        <title>clubwoof | your dog, our playground </title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
