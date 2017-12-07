#!/bin/bash

npm install

if [ "$APP_ENV" = "development" ]; then
  npm run dev
else
  npm run build
  echo "Starting webserver (nginx)...";
  nginx -t
  nginx -g "daemon off;"
fi