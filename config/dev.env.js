var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    NODE_APP_GATEWAY_HOST: '"http://localhost:8000/"',
    NODE_APP_GATEWAY_CLIENT_ID: '"3"',
    NODE_APP_GATEWAY_CLIENT_SECRET: '"OZiAoiI7h4kgxflwQJltX3cR7UNb1uGsSaD2aKfM"',
})
