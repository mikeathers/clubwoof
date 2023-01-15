import '../src/styles/globals.css'
import * as NextImage from 'next/image'
import {RouterContext} from 'next/dist/shared/lib/router-context'
import {Auth} from '@aws-amplify/auth'
import {dev} from '@clubwoof-constants'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  // @ts-ignore
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  layout: 'fullscreen',
}

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  userPoolId: dev.USER_POOL_ID,
  identityPoolId: dev.IDENTITY_POOL_ID,
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})
