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



echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ] && [ "$runningManually" = false ]
  then
    cd backend
fi

if [ "$env" == 'dev' ] && [ "$runningManually" = true ]
  then cd ../../backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi



echo "--- 🚀 Removing old next builds (if possible)..."
#Look for old build folders -> remove -> create new
#Or create new

if [ "$env" == 'dev' ]
  then
    if [ -d "$frontendBuildDevDir" ]
      then
        rm -r "$frontendBuildDevDir"
        echo "Removed ${frontendBuildDevDir}"
    fi
    if [ -d "$frontendZipDevDir" ]
          then
            rm -r "$frontendZipDevDir"
            echo "Removed ${frontendZipDevDir}"
        fi
    mkdir "$frontendBuildDevDir"
    mkdir "$frontendZipDevDir"
fi

if [ "$env" == 'prod' ]
  then
    if [ -d "$frontendBuildProdDir" ]
      then
        rm -r "$frontendBuildProdDir"
        echo "Removed ${frontendBuildProdDir}"
    fi
    if [ -d "$frontendZipProdDir" ]
      then
        rm -r "$frontendZipProdDir"
         echo "Removed ${frontendZipProdDir}"
    fi
    mkdir "$frontendBuildProdDir"
    mkdir "$frontendZipProdDir"
fi



if [ "$env" == 'dev' ]
  then
    if [ -d "$storybookBuildDir" ]
      then
        echo "--- 🚀 Removing old storybook builds for dev (if possible)..."
        rm -r "$storybookBuildDir"
    fi
    mkdir "$storybookBuildDir"
fi



echo "--- 🚀 Changing directory to frontend..."
cd ..



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