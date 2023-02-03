#!/usr/bin/env node
import 'source-map-support/register'
import {App} from 'aws-cdk-lib'

import {StaticSiteStack} from './static-site-stack'
import {CognitoStack} from './cognito-stack'
import CONFIG from './config'
import {ServicesStack} from './services-stack'

const app = new App()

new StaticSiteStack(app, 'ClubwoofWebsiteDev', {
  stackName: 'ClubwoofWebsiteDev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'Dev',
})

new StaticSiteStack(app, 'ClubwoofWebsiteProd', {
  stackName: 'ClubwoofWebsiteProd',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'Prod',
})

const {userPool: devUserPool} = new CognitoStack(app, 'ClubwoofCognitoDev', {
  stackName: 'ClubwoofCognitoDev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'Dev',
})

const {userPool: prodUserPool} = new CognitoStack(app, 'ClubwoofCognitoProd', {
  stackName: 'ClubwoofCognitoProd',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'Prod',
})

new ServicesStack(app, 'ClubwoofServicesDev', {
  stackName: 'ClubwoofServicesDev',
  env: {
    account: process.env.AWS_ACCOUNT_ID || CONFIG.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION || CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
  deploymentEnvironment: 'Dev',
  userPool: devUserPool,
})

new ServicesStack(app, 'ClubwoofServicesProd', {
  stackName: 'ClubwoofServicesProd',
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
  tags: {env: 'prod'},
  deploymentEnvironment: 'Prod',
  userPool: prodUserPool,
})
