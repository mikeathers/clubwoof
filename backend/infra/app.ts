#!/usr/bin/env node
import 'source-map-support/register'
import {App} from "aws-cdk-lib";

import { BackendStack } from './backend-stack'
import CONFIG from '../config'

const app = new App()
new BackendStack(app, `${CONFIG.STACK_PREFIX}-dev`, {
  stackName: `${CONFIG.STACK_PREFIX}-dev`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {env: 'dev'},
})
