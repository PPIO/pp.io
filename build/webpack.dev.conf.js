'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const merge = require('webpack-merge')

const config = require('./config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const logger = require('../server/logger')

// export multiple webpack configs to support multiple languages
const langList = config.lang

/**
 * dll plugin
 */
function dependencyHandlers() {
  if (process.env.BUILDING_DLL) {
    return []
  }

  if (!config.dllPlugin) {
    return []
  }
  const dllConfig = config.dllPlugin.defaults

  const manifestPath = dllConfig.manifestPath

  if (!fs.existsSync(manifestPath)) {
    logger.error('dll manifest do not exist. Run `npm run build:dll`')
    process.exit(0)
  }

  return [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath),
    }),
  ]
}

const webpackConfigs = langList.map(lang => {
  // entries
  const pageEntries = {}
  const pagesArr = utils.getPagesArr()

  pagesArr.forEach(page => {
    pageEntries[page] = [
      path.resolve(utils.getPagesDir(), page),
      // in multi-compiler mode, must set 'name' parameter to make sure bundles don't process each other's updates
      `webpack-hot-middleware/client?name=${lang}&reload=true`,
    ]

    const mobEntryPath = path.resolve(utils.getPagesDir(), `${page}_mob.js`)
    if (fs.existsSync(mobEntryPath)) {
      // for mobile page
      pageEntries[`${page}_mob`] = [
        path.resolve(utils.getPagesDir(), `${page}_mob`),
        `webpack-hot-middleware/client?name=${lang}_mob&reload=true`,
      ]
    }
  })

  // HTML webpack plugins
  const pagePlugins = []
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]

    pagePlugins.push(
      new HtmlWebpackPlugin({
        filename: `${lang}/${pageName}.html`,
        template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
        chunks: ['picturefill', 'mob-detect', 'browsehappy', page],
        lang,
        isMob: false,
        inject: false, // handle injection in render.js
        headChunks: ['picturefill', 'mob-detect', 'browsehappy'],
      }),
    )

    // for mobile page
    pagePlugins.push(
      new HtmlWebpackPlugin({
        filename: `${lang}/${pageName}_mob.html`,
        template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
        chunks: ['picturefill', `${page}_mob`],
        lang,
        isMob: true,
        inject: false,
        headChunks: ['picturefill'],
      }),
    )
  })

  // merge plugins
  const plugins = dependencyHandlers().concat([
    new webpack.DefinePlugin({
      LANGUAGE: JSON.stringify(lang),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...pagePlugins,
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
  ])

  return merge(baseWebpackConfig, {
    name: lang,

    mode: 'development',

    entry: {
      ...pageEntries,
    },

    module: {
      rules: utils.styleLoaders({
        extract: false,
        sourceMap: config.dev.cssSourceMap,
      }),
    },

    output: {
      filename: `${lang}/[name].js`,
    },

    optimization: {
      minimize: false,
    },

    devtool: config.dev.devtool,

    plugins: plugins,
  })
})

module.exports = webpackConfigs
