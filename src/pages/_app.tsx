/* eslint-disable */
import {Auth} from '@aws-amplify/auth'
import type {AppProps} from 'next/app'
import Head from 'next/head'

import {dev} from '../constants'
import '../styles/globals.css'

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  userPoolId: dev.USER_POOL_ID,
  identityPoolId: dev.IDENTITY_POOL_ID,
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>clubwoof | your dog, our playground </title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
