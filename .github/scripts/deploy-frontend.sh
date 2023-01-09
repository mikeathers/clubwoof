#!/usr/bin/env bash

set -euo pipefail

env="$1"
frontendZipProdDir="frontend-build/zip/prod"
frontendZipDevDir="frontend-build/zip/dev"

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ]
  then cd backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi

echo "--- 🚀 Unzipping the build..."
if [ "$env" == 'dev' ]
  then unzip -o -q "$frontendZipDevDir/build.zip"
fi

if [ "$env" == 'prod' ]
  then unzip -o -q "$frontendZipProdDir/build.zip"
fi

echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Deploying CDK stack..."

if [ "$env" == 'prod' ]
  then npm run deploy:frontend:prod
fi

if [ "$env" == 'dev' ]
  then npm run deploy:frontend:dev
fi
