#!/usr/bin/env bash

set -euo pipefail

env="$1"

echo "--- 🚀 Running lint and test script..."

echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ]
  then cd backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi

echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint

