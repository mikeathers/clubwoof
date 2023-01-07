#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

# Ok lets's jump into our CDK directory
cd backend

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint

echo "--- 🚀 Deploy backend stack..."
npm run deploy-backend-dev

# Ok lets's jump back into our Next directory
cd ..

echo "--- 🚀 Run next build...";
npm run dev-build;

echo "--- 🚀 Run next export..."
npm run export

# Ok lets's jump into our CDK directory
cd backend

# For now we only want the static bundle
zip -r build.zip out