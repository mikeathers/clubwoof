#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'

import { StaticSiteInfraDemoStack } from './static-site-stack'
import CONFIG from '../config'
import { BackendStack } from './backend-stack'

const app = new App()

new StaticSiteInfraDemoStack(app, 'clubwoof-website-dev', 'dev', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: { env: 'dev' },
})

new StaticSiteInfraDemoStack(app, 'clubwoof-website-prod', 'prod', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: { env: 'prod' },
})

new BackendStack(app, `${CONFIG.STACK_PREFIX}-dev`, {
  stackName: `${CONFIG.STACK_PREFIX}-dev`,
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
  },
  tags: { env: 'dev' },
})
