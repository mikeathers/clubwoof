#!/usr/bin/env bash

set -euo pipefail

env="$1"
runningManually="$2"

echo "--- 🚀 Running lint and test script..."

echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ] && [ "$runningManually" = false ]
  then cd backend
fi

if [ "$env" == 'dev' ] && [ "$runningManually" = true ]
  then cd ../../backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi

echo "--- 🚀 Installing npm dependencies..."
npm ci

echo "--- 🚀 Run lint..."
npm run lint