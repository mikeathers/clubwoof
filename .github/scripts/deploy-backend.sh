#!/usr/bin/env bash

set -euo pipefail

env=$1
runningManually="$2"

echo "--- 🚀 Installing npm dependencies..."
npm ci



echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ] && [ "$runningManually" = false ]
  then
    cd backend
fi

if [ "$env" == 'dev' ] && [ "$runningManually" = true ]
  then cd ../../backend
fi

if [ "$env" == 'prod' ]
  then
    cd ../../backend
fi



if [ "$env" == 'dev' ]
  then
    echo "--- 🚀 Installing npm dependencies..."
    npm ci
fi



echo "--- 🚀 Deploying backend CDK stack..."
if [ "$env" == 'prod' ]
  then
    npm run deploy:backend:prod
fi

if [ "$env" == 'dev' ]
  then npm run deploy:backend:dev
fi
