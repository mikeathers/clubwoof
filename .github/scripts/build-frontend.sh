#!/usr/bin/env bash

set -euo pipefail

env="$1"
frontendBuildDevDir="frontend-build/dev"
frontendBuildProdDir="frontend-build/prod"
frontendZipProdDir="frontend-build/zip/prod"
frontendZipDevDir="frontend-build/zip/dev"

echo "--- 🚀 Changing directory to backend..."
if [ "$env" == 'dev' ]
  then cd backend
fi

if [ "$env" == 'prod' ]
  then cd ../../backend
fi

echo "--- 🚀 Removing old next builds (if possible)..."
#Look for old build folders, remove, create new
#Or create new

if [ "$env" == 'dev' ]
  then
    if [ -d "$frontendBuildDevDir" ]
      then
        rm -r "$frontendBuildDevDir"
    fi
    if [ -d "$frontendZipDevDir" ]
          then
            rm -r "$frontendZipDevDir"
        fi
    mkdir "$frontendBuildDevDir"
    mkdir "$frontendZipDevDir"
fi

if [ "$env" == 'prod' ]
  then
    if [ -d "$frontendBuildProdDir" ]
      then
        rm -r "$frontendBuildProdDir"
    fi
    if [ -d "$frontendZipProdDir" ]
      then
        rm -r "$frontendZipProdDir"
    fi
    mkdir "$frontendBuildProdDir"
    mkdir "$frontendZipProdDir"
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

echo "--- 🚀 Changing directory to backend..."
cd backend

echo "--- 🚀 Zipping build..."
if [ "$env" == 'dev' ]
  then zip -r "$frontendZipDevDir/build.zip" "$frontendBuildDevDir"
fi

if [ "$env" == 'prod' ]
  then zip -r "$frontendZipProdDir/build.zip" "$frontendBuildProdDir"
fi