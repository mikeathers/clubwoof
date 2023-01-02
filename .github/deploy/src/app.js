#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const static_site_stack_1 = require("./static-site-stack");
const config_1 = require("../config");
const backend_stack_1 = require("./backend-stack");
const app = new aws_cdk_lib_1.App();
new static_site_stack_1.StaticSiteStack(app, `${config_1.default.STACK_PREFIX}-website-dev`, {
    env: {
        account: process.env.AWS_ACCOUNT_ID,
        region: process.env.AWS_DEFAULT_REGION,
    },
    tags: { env: 'dev' },
    deploymentEnvironment: 'dev',
});
new static_site_stack_1.StaticSiteStack(app, `${config_1.default.STACK_PREFIX}-website-prod`, {
    env: {
        account: config_1.default.AWS_ACCOUNT_ID,
        region: config_1.default.AWS_DEFAULT_REGION,
    },
    tags: { env: 'prod' },
    deploymentEnvironment: 'prod',
});
new backend_stack_1.BackendStack(app, `${config_1.default.STACK_PREFIX}-backend-dev`, {
    stackName: `${config_1.default.STACK_PREFIX}-dev`,
    env: {
        account: process.env.AWS_ACCOUNT_ID,
        region: process.env.AWS_DEFAULT_REGION,
    },
    tags: { env: 'dev' },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFvQztBQUNwQyw2Q0FBaUM7QUFFakMsMkRBQXFEO0FBQ3JELHNDQUE4QjtBQUM5QixtREFBOEM7QUFFOUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUE7QUFFckIsSUFBSSxtQ0FBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFNLENBQUMsWUFBWSxjQUFjLEVBQUU7SUFDN0QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUNuQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7S0FDdkM7SUFDRCxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0lBQ3BCLHFCQUFxQixFQUFFLEtBQUs7Q0FDN0IsQ0FBQyxDQUFBO0FBRUYsSUFBSSxtQ0FBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFNLENBQUMsWUFBWSxlQUFlLEVBQUU7SUFDOUQsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLGdCQUFNLENBQUMsY0FBYztRQUM5QixNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxrQkFBa0I7S0FDbEM7SUFDRCxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0lBQ3JCLHFCQUFxQixFQUFFLE1BQU07Q0FDOUIsQ0FBQyxDQUFBO0FBRUYsSUFBSSw0QkFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFNLENBQUMsWUFBWSxjQUFjLEVBQUU7SUFDMUQsU0FBUyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLE1BQU07SUFDdkMsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUNuQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7S0FDdkM7SUFDRCxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQ3JCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnYXdzLWNkay1saWInXG5cbmltcG9ydCB7IFN0YXRpY1NpdGVTdGFjayB9IGZyb20gJy4vc3RhdGljLXNpdGUtc3RhY2snXG5pbXBvcnQgQ09ORklHIGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IEJhY2tlbmRTdGFjayB9IGZyb20gJy4vYmFja2VuZC1zdGFjaydcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpXG5cbm5ldyBTdGF0aWNTaXRlU3RhY2soYXBwLCBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS13ZWJzaXRlLWRldmAsIHtcbiAgZW52OiB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQVdTX0FDQ09VTlRfSUQsXG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfREVGQVVMVF9SRUdJT04sXG4gIH0sXG4gIHRhZ3M6IHsgZW52OiAnZGV2JyB9LFxuICBkZXBsb3ltZW50RW52aXJvbm1lbnQ6ICdkZXYnLFxufSlcblxubmV3IFN0YXRpY1NpdGVTdGFjayhhcHAsIGAke0NPTkZJRy5TVEFDS19QUkVGSVh9LXdlYnNpdGUtcHJvZGAsIHtcbiAgZW52OiB7XG4gICAgYWNjb3VudDogQ09ORklHLkFXU19BQ0NPVU5UX0lELFxuICAgIHJlZ2lvbjogQ09ORklHLkFXU19ERUZBVUxUX1JFR0lPTixcbiAgfSxcbiAgdGFnczogeyBlbnY6ICdwcm9kJyB9LFxuICBkZXBsb3ltZW50RW52aXJvbm1lbnQ6ICdwcm9kJyxcbn0pXG5cbm5ldyBCYWNrZW5kU3RhY2soYXBwLCBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1iYWNrZW5kLWRldmAsIHtcbiAgc3RhY2tOYW1lOiBgJHtDT05GSUcuU1RBQ0tfUFJFRklYfS1kZXZgLFxuICBlbnY6IHtcbiAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5BV1NfQUNDT1VOVF9JRCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkFXU19ERUZBVUxUX1JFR0lPTixcbiAgfSxcbiAgdGFnczogeyBlbnY6ICdkZXYnIH0sXG59KVxuIl19