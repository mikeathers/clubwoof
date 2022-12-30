#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const aws_cdk_lib_1 = require("aws-cdk-lib");
// import {BackendStack} from './backend-stack'
// import CONFIG from '../config'
// import {getStackName} from "./aws/helpers";
// import {StaticSiteInfraDemoStack} from "./static-site-stack";
const config_1 = require("../config");
const static_site_stack2_1 = require("./static-site-stack2");
const app = new aws_cdk_lib_1.App();
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
new static_site_stack2_1.StackSiteStack(app, 'clubwoof-static-site', {
    env: {
        account: config_1.default.AWS_ACCOUNT_ID,
        region: config_1.default.AWS_DEFAULT_REGION,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFvQztBQUNwQyw2Q0FBZ0M7QUFFaEMsK0NBQStDO0FBQy9DLGlDQUFpQztBQUNqQyw4Q0FBOEM7QUFDOUMsZ0VBQWdFO0FBQ2hFLHNDQUErQjtBQUMvQiw2REFBb0Q7QUFFcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUE7QUFFckIsOEJBQThCO0FBQzlCLG9DQUFvQztBQUNwQyxxREFBcUQ7QUFDckQsa0ZBQWtGO0FBQ2xGLGlGQUFpRjtBQUNqRixpRkFBaUY7QUFDakYsdUZBQXVGO0FBQ3ZGLDZGQUE2RjtBQUU3Rix1QkFBdUI7QUFDdkIsdUVBQXVFO0FBQ3ZFLDJEQUEyRDtBQUMzRCx5Q0FBeUM7QUFDekMsOENBQThDO0FBQzlDLEtBQUs7QUFFTCxrREFBa0Q7QUFDbEQsc0VBQXNFO0FBQ3RFLHVCQUF1QjtBQUN2Qix5Q0FBeUM7QUFDekMsMEJBQTBCO0FBQzFCLEtBQUs7QUFFTCxtREFBbUQ7QUFDbkQsMkRBQTJEO0FBQzNELG1DQUFtQztBQUNuQyxxREFBcUQ7QUFDckQsd0NBQXdDO0FBQ3hDLEtBQUs7QUFFTCxnQ0FBZ0M7QUFDaEMsZUFBZTtBQUNmLFNBQVM7QUFDVCx5Q0FBeUM7QUFDekMsMENBQTBDO0FBQzFDLFdBQVc7QUFDWCwyQ0FBMkM7QUFDM0MsOENBQThDO0FBQzlDLE1BQU07QUFDTixLQUFLO0FBRUwsSUFBSSxtQ0FBYyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsRUFBRTtJQUM5QyxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxjQUFjO1FBQzlCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLGtCQUFrQjtLQUNsQztDQUNGLENBQUMsQ0FBQztBQUVILHdEQUF3RDtBQUN4RCw2Q0FBNkM7QUFDN0MsV0FBVztBQUNYLDJDQUEyQztBQUMzQyw4Q0FBOEM7QUFDOUMsT0FBTztBQUNQLHdCQUF3QjtBQUN4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQge0FwcH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5cbi8vIGltcG9ydCB7QmFja2VuZFN0YWNrfSBmcm9tICcuL2JhY2tlbmQtc3RhY2snXG4vLyBpbXBvcnQgQ09ORklHIGZyb20gJy4uL2NvbmZpZydcbi8vIGltcG9ydCB7Z2V0U3RhY2tOYW1lfSBmcm9tIFwiLi9hd3MvaGVscGVyc1wiO1xuLy8gaW1wb3J0IHtTdGF0aWNTaXRlSW5mcmFEZW1vU3RhY2t9IGZyb20gXCIuL3N0YXRpYy1zaXRlLXN0YWNrXCI7XG5pbXBvcnQgQ09ORklHIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7U3RhY2tTaXRlU3RhY2t9IGZyb20gXCIuL3N0YXRpYy1zaXRlLXN0YWNrMlwiO1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKClcblxuLy8gZS5nIEJSQU5DSF9OQU1FOiBteS1mZWF0dXJlXG4vLyBlLmcgRE9NQUlOX05BTUU6IHR5bGFuZ2VzbWl0aC5jb21cbi8vIGUuZy4gU1VCRE9NQUlOX05BTUU6IG5leHRqcy1zZXJ2ZXJsZXNzLXN0YXRpYy1zaXRlXG4vLyBlLmcuIEdJVEhVQl9SRVBPU0lUT1JZOiB0eWxhbmdlc21pdGgtb3JnYW5pc2F0aW9uL25leHRqcy1zZXJ2ZXJsZXNzLXN0YXRpYy1zaXRlXG4vLyBpZiAoIXByb2Nlc3MuZW52LkJSQU5DSF9OQU1FKSB0aHJvdyBFcnJvcignQSBCUkFOQ0hfTkFNRSBtdXN0IGJlIHByb3ZpZGVkLi4uJylcbi8vIGlmICghcHJvY2Vzcy5lbnYuRE9NQUlOX05BTUUpIHRocm93IEVycm9yKCdBIERPTUFJTl9OQU1FIG11c3QgYmUgcHJvdmlkZWQuLi4nKVxuLy8gaWYgKCFwcm9jZXNzLmVudi5TVUJET01BSU5fTkFNRSkgdGhyb3cgRXJyb3IoJ0EgU1VCRE9NQUlOX05BTUUgbXVzdCBiZSBwcm92aWRlZC4uLicpXG4vLyBpZiAoIXByb2Nlc3MuZW52LkdJVEhVQl9SRVBPU0lUT1JZKSB0aHJvdyBFcnJvcignQSBHSVRIVUJfUkVQT1NJVE9SWSBtdXN0IGJlIHByb3ZpZGVkLi4uJylcblxuLy8gQnJhbmNoIG91ciBzdWJkb21haW5cbi8vIGUuZy4gYnJhbmNoZWRTdWJEb21haW5OYW1lOiBuZXh0anMtc2VydmVybGVzcy1zdGF0aWMtc2l0ZS1teS1mZWF0dXJlXG4vLyBjb25zdCBicmFuY2hlZFN1YkRvbWFpbk5hbWUgPSBnZXRCcmFuY2hlZFN1YkRvbWFpbk5hbWUoe1xuLy8gICBicmFuY2hOYW1lOiBwcm9jZXNzLmVudi5CUkFOQ0hfTkFNRSxcbi8vICAgc3ViRG9tYWluTmFtZTogcHJvY2Vzcy5lbnYuU1VCRE9NQUlOX05BTUVcbi8vIH0pXG5cbi8vIE5vdyB3ZSB3YW50IHRvIGNvbWJpbmUgdGhpcyB3aXRoIG91ciBkb21haW5OYW1lXG4vLyBlLmcuIHVybDogbmV4dGpzLXNlcnZlcmxlc3Mtc3RhdGljLXNpdGUtbXktZmVhdHVyZS50eWxhbmdlc21pdGguY29tXG4vLyBjb25zdCB1cmwgPSBnZXRVcmwoe1xuLy8gICBkb21haW5OYW1lOiBwcm9jZXNzLmVudi5ET01BSU5fTkFNRSxcbi8vICAgYnJhbmNoZWRTdWJEb21haW5OYW1lXG4vLyB9KVxuXG4vLyBHZXQgb3VyIHN0YWNrIG5hbWUgd2hpY2ggYWxzbyBzdXBwb3J0cyBicmFuY2hpbmdcbi8vIGUuZy4gc3RhY2tOYW1lOiBuZXh0anMtc2VydmVybGVzcy1zdGF0aWMtc2l0ZS1teS1mZWF0dXJlXG4vLyBjb25zdCBzdGFja05hbWUgPSBnZXRTdGFja05hbWUoe1xuLy8gICBnaXRodWJSZXBvc2l0b3J5OiBwcm9jZXNzLmVudi5HSVRIVUJfUkVQT1NJVE9SWSxcbi8vICAgYnJhbmNoTmFtZTogcHJvY2Vzcy5lbnYuQlJBTkNIX05BTUVcbi8vIH0pXG5cbi8vIG5ldyBTdGF0aWNXZWJzaXRlU3RhY2soYXBwLCB7XG4vLyAgIHN0YWNrTmFtZSxcbi8vICAgdXJsLFxuLy8gICBkb21haW5OYW1lOiBwcm9jZXNzLmVudi5ET01BSU5fTkFNRSxcbi8vICAgc3ViRG9tYWluTmFtZTogYnJhbmNoZWRTdWJEb21haW5OYW1lLFxuLy8gICBlbnY6IHtcbi8vICAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5BV1NfQUNDT1VOVF9JRCxcbi8vICAgICByZWdpb246IHByb2Nlc3MuZW52LkFXU19ERUZBVUxUX1JFR0lPTixcbi8vICAgfVxuLy8gfSlcblxubmV3IFN0YWNrU2l0ZVN0YWNrKGFwcCwgJ2NsdWJ3b29mLXN0YXRpYy1zaXRlJywge1xuICBlbnY6IHtcbiAgICBhY2NvdW50OiBDT05GSUcuQVdTX0FDQ09VTlRfSUQsXG4gICAgcmVnaW9uOiBDT05GSUcuQVdTX0RFRkFVTFRfUkVHSU9OLFxuICB9LFxufSk7XG5cbi8vIG5ldyBCYWNrZW5kU3RhY2soYXBwLCBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1kZXZgLCB7XG4vLyAgIHN0YWNrTmFtZTogYCR7Q09ORklHLlNUQUNLX1BSRUZJWH0tZGV2YCxcbi8vICAgZW52OiB7XG4vLyAgICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQVdTX0FDQ09VTlRfSUQsXG4vLyAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfREVGQVVMVF9SRUdJT04sXG4vLyAgIH0sXG4vLyAgIHRhZ3M6IHtlbnY6ICdkZXYnfSxcbi8vIH0pXG4iXX0=