import * as config from './cdk-exports-dev.json'

export const dev = {
  REGION: config['clubwoof-dev'].region,
  USER_POOL_ID: config['clubwoof-dev'].userPoolId,
  IDENTITY_POOL_ID: config['clubwoof-dev'].identityPoolId,
  USER_POOL_WEB_CLIENT_ID: config['clubwoof-dev'].userPoolClientId,
}
