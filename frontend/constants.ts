/* eslint-disable */
import prodConfig from '../outputs/cdk-exports-prod.json'
import devConfig from '../outputs/cdk-exports-dev.json'

const prodConstants = {
  REGION: prodConfig['ClubwoofCognitoProd'].Region,
  USER_POOL_ID: prodConfig['ClubwoofCognitoProd'].UserPoolId,
  IDENTITY_POOL_ID: prodConfig['ClubwoofCognitoProd'].IdentityPoolId,
  USER_POOL_WEB_CLIENT_ID: prodConfig['ClubwoofCognitoProd'].UserPoolClientId,
}

const devConstants = {
  REGION: devConfig['ClubwoofCognitoDev'].Region,
  USER_POOL_ID: devConfig['ClubwoofCognitoDev'].UserPoolId,
  IDENTITY_POOL_ID: devConfig['ClubwoofCognitoDev'].IdentityPoolId,
  USER_POOL_WEB_CLIENT_ID: devConfig['ClubwoofCognitoDev'].UserPoolClientId,
}

export const dev =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === 'false' ? devConstants : prodConstants

export const TEMP_PWD_LOCALSTORAGE_KEY = 'AUTO_SIGN_IN'
console.log(process.env.NEXT_PUBLIC_IS_PRODUCTION)
console.log(dev)

export enum ROUTE_PATHS {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  RESEND_REGISTRATION_LINK = '/auth/resend-registration-link',
  FORGOT_PASSWORD = '/auth/forgot-password',
  APP_HOME = '/app/home',
  HOME = '/',
}
