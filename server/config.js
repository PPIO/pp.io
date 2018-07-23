'use strict'

const argv = require('./argv')

module.exports = {
  // Various Dev Server settings
  host: argv.host || process.env.HOST || '0.0.0.0', // can be overwritten by argv or process.env.HOST
  port: parseInt(argv.port || process.env.PORT || '8080', 10), // can be overwritten by argv or process.env.PORT, if port is in use, a free one will be determined

  // PRoxy
  proxyTable: {},

  // publicPath
  assetsPublicPath: '/',
}
