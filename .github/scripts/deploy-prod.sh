#!/usr/bin/env bash

set -euo pipefail

#npm ci

# Ok lets's jump into our CDK directory
cd backend

# Install our npm dependencies
#echo "--- 🚀 Installing npm dependencies..."
#npm ci

echo "--- 🚀 Run lint..."
npm run lint

# Deploy the cdk stack
echo "--- 🚀 Deploying backend CDK stack..."
npm run deploy-backend-prod

# Ok lets's jump back into our Next directory
cd ..

echo "--- 🚀 Run next build...";
npm run prod-build

echo "--- 🚀 Run next export..."
npm run export

# Ok lets's jump into our CDK directory
cd backend

# For now we only want the static bundle
zip -r build.zip out

# Unzip the build artifact
echo "--- 🚀 Unzipping the build..."
unzip -o -q build.zip

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
#npm ci

# Deploy the cdk stack
echo "--- 🚀 Deploying frontend CDK stack..."
npm run deploy-frontend-prod