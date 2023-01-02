#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run next build..."
npm run build

echo "--- 🚀 Run next export..."
npm run export

# Ok lets's jump into our CDK directory
cd .github

# For now we only want the static bundle
zip -r build.zip out