/**
 * webpack dll plugin 配置
 */

const { join } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')

const dllPluginConfig = require('./config').dllPlugin

const dllConfig = dllPluginConfig.defaults
const outputPath = join(process.cwd(), dllConfig.path)

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  context: process.cwd(),
  entry: dllConfig.dlls || dllPluginConfig.entry(),
  optimization: {
    minimize: false,
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: dllConfig.manifestPath,
    }),
  ],
  performance: {
    hints: false,
  },
})
