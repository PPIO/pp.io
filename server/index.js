/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')
const config = require('./config')
const proxy = require('express-http-proxy')

const argv = require('./argv')
const setup = require('./middlewares/frontendMiddleware')

const isDev = process.env.NODE_ENV !== 'production'
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const { resolve } = require('path')

const app = express()

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
Object.keys(config.proxyTable).forEach(urlPtrn => {
  app.use(urlPtrn, proxy(`${config.proxyTable[urlPtrn]}/`))
})

// In production we need to pass these values in instead of relying on webpack
// ignored in development
setup(app, {
  outputPath: resolve(process.cwd(), 'dist'),
  publicPath: config.assetsPublicPath,
})

// Start your app.
app.listen(config.port, config.host, async err => {
  if (err) {
    return logger.error(err.message)
  }

  const prettyHost = argv.host || process.env.HOST || 'localhost'
  // Connect to ngrok in dev mode
  if (ngrok) {
    let url
    try {
      url = await ngrok.connect(config.port)
    } catch (e) {
      return logger.error(e)
    }
    logger.appStarted(config.port, prettyHost, url)
  } else {
    logger.appStarted(config.port, prettyHost)
  }
})
