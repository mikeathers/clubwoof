import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import Auth from '@aws-amplify/auth'
import {dev} from '../constants'

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  USER_POOL_ID: dev.USER_POOL_ID,
  IDENTITY_POOL_ID: dev.IDENTITY_POOL_ID,
  USER_POOL_WEB_CLIENT_ID: dev.USER_POOL_WEB_CLIENT_ID,
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
