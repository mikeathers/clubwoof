/* eslint-disable */
import prodConfig from '../outputs/cdk-exports-prod.json'
import devConfig from '../outputs/cdk-exports-dev.json'

const prodConstants = {
  REGION: prodConfig['ClubwoofBackendProd'].Region,
  USER_POOL_ID: prodConfig['ClubwoofBackendProd'].UserPoolId,
  IDENTITY_POOL_ID: prodConfig['ClubwoofBackendProd'].IdentityPoolId,
  USER_POOL_WEB_CLIENT_ID: prodConfig['ClubwoofBackendProd'].UserPoolClientId,
}

const devConstants = {
  REGION: devConfig['ClubwoofBackendDev'].Region,
  USER_POOL_ID: devConfig['ClubwoofBackendDev'].UserPoolId,
  IDENTITY_POOL_ID: devConfig['ClubwoofBackendDev'].IdentityPoolId,
  USER_POOL_WEB_CLIENT_ID: devConfig['ClubwoofBackendDev'].UserPoolClientId,
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
