/* eslint-disable */
import prodConfig from '../outputs/cdk-exports-prod.json'
import devConfig from '../outputs/cdk-exports-dev.json'

const prodConstants = {
  REGION: prodConfig['clubwoof-backend-prod'].region,
  USER_POOL_ID: prodConfig['clubwoof-backend-prod'].userPoolId,
  IDENTITY_POOL_ID: prodConfig['clubwoof-backend-prod'].identityPoolId,
  USER_POOL_WEB_CLIENT_ID: prodConfig['clubwoof-backend-prod'].userPoolClientId,
}

const devConstants = {
  REGION: devConfig['clubwoof-backend-dev'].region,
  USER_POOL_ID: devConfig['clubwoof-backend-dev'].userPoolId,
  IDENTITY_POOL_ID: devConfig['clubwoof-backend-dev'].identityPoolId,
  USER_POOL_WEB_CLIENT_ID: devConfig['clubwoof-backend-dev'].userPoolClientId,
}

export const dev =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === 'false' ? devConstants : prodConstants

export const TEMP_PWD_LOCALSTORAGE_KEY = 'AUTO_SIGN_IN'
console.log(process.env.NEXT_PUBLIC_IS_PRODUCTION)
console.log(dev)

export const AWS_COGNITO_ENDPOINT = 'https://cognito-idp.eu-west-2.amazonaws.com/'
