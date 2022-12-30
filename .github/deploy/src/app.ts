#!/usr/bin/env node
import 'source-map-support/register'
import {App} from "aws-cdk-lib";

// import {BackendStack} from './backend-stack'
// import CONFIG from '../config'
// import {getStackName} from "./aws/helpers";
import {StaticSiteInfraDemoStack} from "./static-site-stack";
import CONFIG from "../config";

const app = new App()

// e.g BRANCH_NAME: my-feature
// e.g DOMAIN_NAME: tylangesmith.com
// e.g. SUBDOMAIN_NAME: nextjs-serverless-static-site
// e.g. GITHUB_REPOSITORY: tylangesmith-organisation/nextjs-serverless-static-site
// if (!process.env.BRANCH_NAME) throw Error('A BRANCH_NAME must be provided...')
// if (!process.env.DOMAIN_NAME) throw Error('A DOMAIN_NAME must be provided...')
// if (!process.env.SUBDOMAIN_NAME) throw Error('A SUBDOMAIN_NAME must be provided...')
// if (!process.env.GITHUB_REPOSITORY) throw Error('A GITHUB_REPOSITORY must be provided...')

// Branch our subdomain
// e.g. branchedSubDomainName: nextjs-serverless-static-site-my-feature
// const branchedSubDomainName = getBranchedSubDomainName({
//   branchName: process.env.BRANCH_NAME,
//   subDomainName: process.env.SUBDOMAIN_NAME
// })

// Now we want to combine this with our domainName
// e.g. url: nextjs-serverless-static-site-my-feature.tylangesmith.com
// const url = getUrl({
//   domainName: process.env.DOMAIN_NAME,
//   branchedSubDomainName
// })

// Get our stack name which also supports branching
// e.g. stackName: nextjs-serverless-static-site-my-feature
// const stackName = getStackName({
//   githubRepository: process.env.GITHUB_REPOSITORY,
//   branchName: process.env.BRANCH_NAME
// })

// new StaticWebsiteStack(app, {
//   stackName,
//   url,
//   domainName: process.env.DOMAIN_NAME,
//   subDomainName: branchedSubDomainName,
//   env: {
//     account: process.env.AWS_ACCOUNT_ID,
//     region: process.env.AWS_DEFAULT_REGION,
//   }
// })

new StaticSiteInfraDemoStack(app, 'clubwoof-static-site', {
  env: {
    account: CONFIG.AWS_ACCOUNT_ID,
    region: CONFIG.AWS_DEFAULT_REGION,
  },
});

// new BackendStack(app, `${CONFIG.STACK_PREFIX}-dev`, {
//   stackName: `${CONFIG.STACK_PREFIX}-dev`,
//   env: {
//     account: process.env.AWS_ACCOUNT_ID,
//     region: process.env.AWS_DEFAULT_REGION,
//   },
//   tags: {env: 'dev'},
// })
