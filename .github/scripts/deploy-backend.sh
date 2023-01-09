#!/usr/bin/env bash

set -euo pipefail

env=$1

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ]
  then
    cd backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend

fi

echo "--- 🚀 Deploying backend CDK stack..."
if [ "$env" == 'prod' ]
  then
    npm run deploy:backend:prod
fi

if [ "$env" == 'dev' ]
  then npm run deploy:backend:dev
fi
