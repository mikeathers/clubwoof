#!/usr/bin/env bash

set -euo pipefail

echo "--- 🚀 Deploying to Development..."
cd .github/scripts

#echo "--- 🚀 Linting and testing..."
sh lint-and-test.sh "dev"
wait

bash deploy-backend.sh "dev"
wait

bash build-frontend.sh "dev"
wait

bash deploy-frontend.sh "dev"