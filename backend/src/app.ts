#!/usr/bin/env node
import 'source-map-support/register'
import {App} from 'aws-cdk-lib'

import CONFIG from '@clubwoof-backend-config'

import {StaticSiteStack} from './static-site-stack'
import {BackendStack} from './backend-stack'

const app = new App()

new StaticSiteStack(app, 'clubwoof-website-dev', {
  stackName: 'clubwoof-website-dev',
  // env: {
  //   account: process.env.AWS_ACCOUNT_ID,
  //   region: process.env.AWS_DEFAULT_REGION,
  // },
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
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

new BackendStack(app, 'clubwoof-backend-dev', {
  stackName: 'clubwoof-backend-dev',
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  // env: {
  //   account: CONFIG.AWS_ACCOUNT_ID,
  //   region: CONFIG.AWS_DEFAULT_REGION,
  // },
  tags: {env: 'dev'},
  deploymentEnvironment: 'dev',
})

new BackendStack(app, 'clubwoof-backend-prod', {
  stackName: 'clubwoof-backend-prod',
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'prod',
})
