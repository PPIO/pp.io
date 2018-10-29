'use strict'

const webpack = require('webpack')

const dllPluginConfig = require('./config').dllPlugin

const dllConfig = dllPluginConfig.defaults

module.exports = {
  mode: 'development',
  context: process.cwd(),
  entry: dllConfig.dlls || dllPluginConfig.entry(),
  optimization: {
    minimize: false,
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: dllConfig.path,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: dllConfig.manifestPath,
      context: __dirname,
    }),
  ],
  target: 'node',
  performance: {
    hints: false,
  },
}
