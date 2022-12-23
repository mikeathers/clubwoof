#!/usr/bin/env bash

set -euo pipefail

# Install our npm dependencies
echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run next build..."
npm run build

echo "--- 🚀 Run next export..."
npm run export

# For now we only want the static bundle
zip -r .github/backend/build.zip .github/backend/out