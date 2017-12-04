#!/bin/bash

npm install

if [ "$APP_ENV" = "production" ]; then
  npm run
elif [ "$APP_ENV" = "staging" ]; then
  npm run staging
else
  npm run dev
fi