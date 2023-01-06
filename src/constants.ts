/* eslint-disable */
import * as config from 'cdk-exports-dev.json'

export const dev = {
  REGION: config['clubwoof-backend-dev'].region,
  USER_POOL_ID: config['clubwoof-backend-dev'].userPoolId,
  IDENTITY_POOL_ID: config['clubwoof-backend-dev'].identityPoolId,
  USER_POOL_WEB_CLIENT_ID: config['clubwoof-backend-dev'].userPoolClientId,
}
