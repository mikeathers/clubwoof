#!/usr/bin/env bash

set -euo pipefail

# Ok lets's jump into our deploy directory
cd .github/backend

# Unzip the build artifact
echo "--- 🚀 Unzipping the build..."
unzip -q build.zip

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

# Deploy the cdk stack
echo "--- 🚀 Deploying CDK stack..."
npx cdk \
  --require-approval never \
  --verbose \
  --execute true \
  --force \
  --toolkit-stack-name "cdk-toolkit-master" \
  --app "ts-node infra/app.ts" \
  deploy
