#!/usr/bin/env bash

set -euo pipefail

env="$1"
runningManually="$2"
frontendZipProdDir="frontend-build/zip/prod"
frontendZipDevDir="frontend-build/zip/dev"

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ] && [ "$runningManually" = false ]
  then
    cd backend
fi

if [ "$env" == 'dev' ] && [ "$runningManually" = true ]
  then cd ../../backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi



echo "--- 🚀 Unzipping website build..."
if [ "$env" == 'dev' ]
  then unzip -o -q "$frontendZipDevDir/website.build.zip"
fi

if [ "$env" == 'prod' ]
  then unzip -o -q "$frontendZipProdDir/website.build.zip"
fi



echo "--- 🚀 Unzipping story build..."
if [ "$env" == 'dev' ]
  then unzip -o -q "$frontendZipDevDir/storybook.build.zip"
fi



if [ "$env" == 'dev' ]
  then
    echo "--- 🚀 Installing npm dependencies..."
    npm ci
fi



echo "--- 🚀 Deploying CDK stack..."

if [ "$env" == 'prod' ]
  then npm run deploy:frontend:prod
fi

if [ "$env" == 'dev' ]
  then npm run deploy:frontend:dev
fi
