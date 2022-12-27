#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

# Ok lets's jump into our CDK directory
cd .github/deploy

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

# lets's jump back into our nextjs directory
cd ../..

echo "--- 🚀 Run next build..."
npm run build

echo "--- 🚀 Run next export..."
npm run export

# For now we only want the static bundle
zip -r build.zip out