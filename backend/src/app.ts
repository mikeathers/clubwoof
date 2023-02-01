#!/usr/bin/env node
import 'source-map-support/register'
import {App} from 'aws-cdk-lib'

import {StaticSiteStack} from './static-site-stack'
import {CognitoStack} from './cognito-stack'
import CONFIG from './config'
import {ServicesStack} from './services-stack'

const app = new App()

new StaticSiteStack(app, 'clubwoof-website-dev', {
  stackName: 'clubwoof-website-dev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'dev',
})

new StaticSiteStack(app, 'clubwoof-website-prod', {
  stackName: 'clubwoof-website-prod',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'prod',
})

const {authorizer: devAuthorizer} = new CognitoStack(app, 'clubwoof-cognito-dev', {
  stackName: 'clubwoof-cognito-dev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'dev',
})

const {authorizer: prodAuthorizer} = new CognitoStack(app, 'clubwoof-cognito-prod', {
  stackName: 'clubwoof-cognito-prod',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'prod',
})

new ServicesStack(app, 'clubwoof-services-dev', {
  stackName: 'clubwoof-services-dev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'dev',
  authorizer: devAuthorizer,
})

new ServicesStack(app, 'clubwoof-services-prod', {
  stackName: 'clubwoof-services-prod',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'prod',
  authorizer: prodAuthorizer,
})
