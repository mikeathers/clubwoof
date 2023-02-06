interface ConfigProps {
  STACK_PREFIX: string
  DEPLOY_ENVIRONMENT: string
  DEPLOY_REGION: string
  FRONTEND_BASE_URL_DEV: string
  FRONTEND_BASE_URL_PROD: string
  REGION: string
  AWS_ACCOUNT_ID: string
  AWS_DEFAULT_REGION: string
  DOMAIN_NAME: string
  DEV_URL: string
  STORYBOOK_URL: string
  ACCOUNT_API_URL: string
  AUTH_API_URL: string
}

interface CognitoConfig {
  USER_POOL_ID: string
  IDENTITY_POOL_ID: string
  USER_POOL_WEB_CLIENT_ID: string
}

export const PROD_CONFIG: CognitoConfig = {
  USER_POOL_ID: '',
  IDENTITY_POOL_ID: '',
  USER_POOL_WEB_CLIENT_ID: '',
}

export const DEV_CONFIG: CognitoConfig = {
  USER_POOL_ID: 'eu-west-2_ben0SckmT',
  IDENTITY_POOL_ID: 'eu-west-2:94247e2f-3d5f-4c3f-ac58-980f55c8ff05',
  USER_POOL_WEB_CLIENT_ID: '8ksti2cn3d0i34cjv3t3och9h',
}

const CONFIG: ConfigProps = {
  STACK_PREFIX: 'Clubwoof',
  DEPLOY_ENVIRONMENT: process.env.DEPLOY_ENVIRONMENT || 'dev',
  DEPLOY_REGION: process.env.CDK_DEFAULT_REGION || 'eu-west-2',
  FRONTEND_BASE_URL_DEV: 'https://dev.clubwoof.co.uk',
  FRONTEND_BASE_URL_PROD: 'https://dev.clubwoof.co.uk',
  REGION: 'eu-west-2',
  AWS_ACCOUNT_ID: '222743583620',
  AWS_DEFAULT_REGION: 'eu-west-2',
  DOMAIN_NAME: 'clubwoof.co.uk',
  DEV_URL: 'dev.clubwoof.co.uk',
  STORYBOOK_URL: 'storybook.clubwoof.co.uk',
  ACCOUNT_API_URL: 'account.clubwoof.co.uk',
  AUTH_API_URL: 'auth.clubwoof.co.uk',
}

export default CONFIG
