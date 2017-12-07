require('./check-versions')()

var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  webpack(webpackConfig, function (err, stats) {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))

      process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)

      var express = require('express')
      var port = config.build.port
      var app = express()
      var compiler = webpack(webpackConfig)

      var devMiddleware = require('webpack-dev-middleware')(compiler, {
          publicPath: webpackConfig.output.publicPath,
          quiet: true
      })

      var hotMiddleware = require('webpack-hot-middleware')(compiler, {
          log: () => {}
      })

      compiler.plugin('compilation', function (compilation) {
          compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
              hotMiddleware.publish({ action: 'reload' })
              cb()
          })
      })

      app.use(require('connect-history-api-fallback')())
      app.use(devMiddleware)
      app.use(hotMiddleware)

      var uri = 'http://localhost:' + port

      var _resolve
      var readyPromise = new Promise(resolve => {
          _resolve = resolve
      })

      console.log('> Starting Production server...')

      devMiddleware.waitUntilValid(() => {
          console.log('> Listening at ' + uri + '\n')
          _resolve()
      })

      app.listen(port)
  })
})


