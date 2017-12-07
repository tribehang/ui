#!/bin/bash

npm install

if [ "$APP_ENV" = "production" ]; then
  npm run build
elif [ "$APP_ENV" = "staging" ]; then
  npm run build
else
  npm run dev
fi