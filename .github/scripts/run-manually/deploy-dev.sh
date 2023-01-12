#!/usr/bin/env bash

set -euo pipefail

echo "--- 🚀 Deploying to Development..."
cd .github/scripts

#sh lint-and-test.sh "dev" true
#wait

bash deploy-backend.sh "dev" true
wait

bash build-frontend.sh "dev" true
wait

bash deploy-frontend.sh "dev" true