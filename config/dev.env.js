var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    NODE_APP_GATEWAY_HOST: '"http://localhost:8000/"',
    NODE_APP_GATEWAY_CLIENT_ID: '"3"',
    NODE_APP_GATEWAY_CLIENT_SECRET: '"OZiAoiI7h4kgxflwQJltX3cR7UNb1uGsSaD2aKfM"',
    NODE_APP_S3: '"//s3.eu-central-1.amazonaws.com"',
    NODE_APP_S3_BUCKET: '"semsari-staging"',
    NODE_APP_S3_USER_PROFILE_BUCKET: '"profile_images"'
})
