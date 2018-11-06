/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')
const config = require('./config')
const proxy = require('http-proxy-middleware')
const proxyTable = require('./config').proxyTable

const argv = require('./argv')
const setup = require('./middlewares/frontendMiddleware')

const ngrok =
  process.env.ENABLE_TUNNEL || argv.tunnel ? require('ngrok') : false
const { resolve } = require('path')

const app = express()

// proxy table for api calls
Object.keys(config.proxyTable).forEach(urlPtrn => {
  app.use(urlPtrn, proxy(proxyTable[urlPtrn]))
})

// Jump to English version by default
app.get('/', (req, res) => {
  console.log('visiting')
  res.redirect('/en')
})

setup(app, {
  outputPath: resolve(process.cwd(), 'dist'),
  publicPath: config.assetsPublicPath,
})

// Start your app.
module.exports = app.listen(config.port, config.host, async err => {
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
