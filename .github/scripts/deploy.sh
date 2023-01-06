#!/usr/bin/env bash

set -euo pipefail

# Ok lets's jump into our CDK directory
cd backend

# Unzip the build artifact
echo "--- 🚀 Unzipping the build..."
unzip -o -q build.zip

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

# Deploy the cdk stack
echo "--- 🚀 Deploying CDK stack..."
npm run deploy-all-dev
