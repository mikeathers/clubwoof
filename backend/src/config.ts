interface ConfigProps {
  STACK_PREFIX: string
  DEPLOY_ENVIRONMENT: string
  DEPLOY_REGION: string
  FRONTEND_BASE_URL_DEV: string
  FRONTEND_BASE_URL_PROD: string
  REGION: string
  USER_POOL_ID: string
  APP_CLIENT_ID: string
  IDENTITY_POOL_ID: string
  AWS_ACCOUNT_ID: string
  AWS_DEFAULT_REGION: string
  DOMAIN_NAME: string
  DEV_URL: string
  STORYBOOK_URL: string
}
const CONFIG: ConfigProps = {
  STACK_PREFIX: 'clubwoof',
  DEPLOY_ENVIRONMENT: process.env.DEPLOY_ENVIRONMENT || 'dev',
  DEPLOY_REGION: process.env.CDK_DEFAULT_REGION || 'eu-west-2',
  FRONTEND_BASE_URL_DEV: 'https://dev.clubwoof.co.uk',
  FRONTEND_BASE_URL_PROD: 'https://dev.clubwoof.co.uk',
  REGION: 'eu-west-2',
  USER_POOL_ID: 'eu-west-2_TjKZAlfRe',
  APP_CLIENT_ID: '5lqvge3a1fj3gu46uh7o6ldtk2',
  IDENTITY_POOL_ID: 'eu-west-2:b9df3a72-faa8-4815-b1f4-38387b251c63',
  AWS_ACCOUNT_ID: '222743583620',
  AWS_DEFAULT_REGION: 'eu-west-2',
  DOMAIN_NAME: 'clubwoof.co.uk',
  DEV_URL: 'dev.clubwoof.co.uk',
  STORYBOOK_URL: 'storybook.clubwoof.co.uk',
}

export default CONFIG