var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    NODE_API_HOST: '"http://localhost:8080/api/"',
    NODE_APPOINTMENT_API_HOST: '"http://localhost:8090/api/"',
    NODE_API_CLIENT_ID: '"3"',
    NODE_API_CLIENT_SECRET: '"OZiAoiI7h4kgxflwQJltX3cR7UNb1uGsSaD2aKfM"',
    NODE_AWS_BUCKET_LINK: '"http://localhost:8080/storage/"'
})