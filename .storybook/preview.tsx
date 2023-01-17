import {Auth} from '@aws-amplify/auth'
import {dev} from '@clubwoof-constants'
import '../frontend/styles/globals.css'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  options: {
    showPanel: false,
  },
}

Auth.configure({
  mandatorySignIn: false,
  region: dev.REGION,
  userPoolId: dev.USER_POOL_ID,
  identityPoolId: dev.IDENTITY_POOL_ID,
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})
