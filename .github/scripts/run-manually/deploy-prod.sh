#!/usr/bin/env bash

set -euo pipefail

echo "--- 🚀 Deploying to Production..."
cd .github/scripts

sh lint-test-clean.sh "prod" true
wait

bash deploy-backend.sh "prod" true
wait

bash build-frontend.sh "prod" true
wait

bash deploy-frontend.sh "prod" true