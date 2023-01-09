#!/usr/bin/env bash

set -euo pipefail

echo "--- 🚀 Deploying to Production..."
cd .github/scripts

#echo "--- 🚀 Linting and testing..."
sh lint-and-test.sh "prod"
wait

bash deploy-backend.sh "prod"
wait

bash build-frontend.sh "prod"
wait

bash deploy-frontend.sh "prod"