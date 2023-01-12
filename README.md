# Clubwoof Deployment Guide 🐶🐾

## Initial Setup 🚀

First, we need to make sure the following folders are available.

```bash
clubwoof/backend/frontend-build/dev
clubwoof/backend/frontend-build/prop
clubwoof/backend/frontend-build/zip/dev
clubwoof/backend/frontend-build/zip/dev
```


We have GitHub actions integrated for our dev environment so when push changes onto master a new 
<br>
build will trigger and deploy our stacks.

However, if this the first deployment then we first need deploy the stacks to AWS, so they have been created/initialised.<br>

First make sure we are using configuration values from our local config file for all our deployments in app.ts.<br>
The reason we do this is that the build will try and request credentials from github when we deploy locally<br>
which we don't want.

```bash
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
```
Run the following scripts:
```bash
clubwoof/.github/scripts/run-manually/deploy-dev.sh
clubwoof/.github/scripts/run-manually/deploy-prod.sh
```

The outputs from the backend stack deployments get saved to the below folder.<br>

```bash
clubwoof/src/outputs
```

These outputs need to be populated before we deploy the frontend application. <br>
When we run the deploy-frontend script we build our application which uses the<br>
variables from these output files.
If you're troubleshooting things not working as they should then i would start by looking here.



Now when we push changes to github our dev stack will be updated with the changes from our commit. <br>
When we want to deploy prod we need to run the deploy-prod.sh script manually like above.

## Running Locally 🛠

Run the follow script

```bash
npm run dev
```

