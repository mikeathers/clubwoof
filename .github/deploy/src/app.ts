#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'

import { StaticSiteStack } from './static-site-stack'
import CONFIG from '../config'
import { BackendStack } from './backend-stack'

const app = new App()

new StaticSiteStack(app, `${CONFIG.STACK_PREFIX}-website-dev`, {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: { env: 'dev' },
  deploymentEnvironment: 'dev',
})

new StaticSiteStack(app, `${CONFIG.STACK_PREFIX}-website-prod`, {
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: { env: 'prod' },
  deploymentEnvironment: 'prod',
})

new BackendStack(app, `${CONFIG.STACK_PREFIX}-backend-dev`, {
  stackName: `${CONFIG.STACK_PREFIX}-dev`,
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: { env: 'dev' },
})
