# Clubwoof Deployment Guide

## Initial Setup 🚀

First, we need to make sure the following folders are available

```bash
clubwoof/backend/frontend-build/dev
clubwoof/backend/frontend-build/prop
clubwoof/backend/frontend-build/zip/dev
clubwoof/backend/frontend-build/zip/dev
```

We have GitHub actions integrated for our dev environment so when push changes onto master a new 
<br>
build will trigger and deploy our stacks.

However, we first need deploy the stacks to AWS so they have been created/initialised.

Run the following scripts:
```bash
clubwoof/.github/scripts/run-manually/deploy-dev.sh
clubwoof/.github/scripts/run-manually/deploy-prod.sh
```

Now when we push changes to github our dev stack will be updated with the changes from our commit. <br>
When we want to deploy prod we need to run the deploy-prod.sh script manually from above.

## Running Locally 🛠

Run the follow script

```bash
npm run dev
```

