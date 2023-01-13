#!/usr/bin/env bash

set -euo pipefail

env="$1"
runningManually="$2"
frontendBuildDevDir="frontend-build/dev"
frontendBuildProdDir="frontend-build/prod"
frontendZipProdDir="frontend-build/zip/prod"
frontendZipDevDir="frontend-build/zip/dev"
storybookBuildDir="storybook-build"




echo "--- 🚀 Installing npm dependencies..."
npm ci


echo "--- 🚀 Running next build & export...";
if [ "$env" == 'dev' ]
  then npm run build:dev
fi



if [ "$env" == 'prod' ]
  then npm run build:prod
fi



if [ "$env" == 'dev' ]
  then
    echo "--- 🚀 Running storybook build and export...";
    npm run storybook:build
fi



echo "--- 🚀 Changing directory to backend..."
cd backend



echo "--- 🚀 Zipping website build..."
if [ "$env" == 'dev' ]
  then zip -r "$frontendZipDevDir/website.build.zip" "$frontendBuildDevDir"
fi

if [ "$env" == 'prod' ]
  then zip -r "$frontendZipProdDir/website.build.zip" "$frontendBuildProdDir"
fi



if [ "$env" == 'dev' ]
  then
    echo "--- 🚀 Zipping storybook build..."
    zip -r "$frontendZipDevDir/storybook.build.zip" "$storybookBuildDir"
fi