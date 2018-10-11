'use strict'

const argv = require('./argv')

module.exports = {
  // Various Dev Server settings
  host: argv.host || process.env.HOST || '0.0.0.0', // can be overwritten by argv or process.env.HOST
  port: parseInt(
    argv.port ||
      process.env.PORT ||
      (process.env.NODE_ENV === 'production' ? '9000' : '8080'),
    10,
  ), // can be overwritten by argv or process.env.PORT, if port is in use, a free one will be determined

  // Proxy
  proxyTable: {
    '/blog': {
      target: 'https://blog.pp.io',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log(path)
        return path.replace('/blog', '')
      },
    },
  },

  // publicPath
  assetsPublicPath: '/',
}
