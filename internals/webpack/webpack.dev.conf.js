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
const logger = require('../../server/logger')

// export multiple webpack configs to support multi languages
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
  const dllPath = config.dllPlugin.defaults.path

  /**
   * 如果没有指定 dlls 字段, 使用所有 package.json 中的 dependencies
   * 需要在 dllConfig.exclude 中排除所有非浏览器端的依赖
   */
  if (!dllConfig.dlls) {
    const manifestPath = dllConfig.manifestPath

    if (!fs.existsSync(manifestPath)) {
      logger.error('dll manifest 不存在. 请运行 `npm run build:dll`')
      process.exit(0)
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath),
      }),
    ]
  }

  // 如果 dlls 被指定 自动为每一项创建 dllReferencePlugin.
  const dllManifests = Object.keys(dllConfig.dlls).map(name =>
    path.join(dllPath, `/${name}.json`),
  )

  return dllManifests.map(manifestPath => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        logger.error(
          `以下 webpack DLL manifest 不存在：${path.basename(manifestPath)}`,
        )
        logger.error('Please run: npm run build:dll')
        process.exit(0)
      }
    }

    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath), // eslint-disable-line global-require
    })
  })
}

const webpackConfigs = []
for (let i = 0; i <= langList.length; i++) {
  const lang = langList[i] || 'en'
  // entries
  const pageEntries = {}
  const pagesArr = utils.getPagesArr()
  pagesArr.forEach(page => {
    pageEntries[page] = [
      path.resolve(utils.getPagesDir(), page.split('.')[0]),
      // in multi-compiler mode, must set 'name' parameter to make sure bundles don't process each other's updates
      `webpack-hot-middleware/client?name=${lang}&reload=true`,
    ]
  })

  // HTML webpack plugins
  const pagePlugins = []
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]
    pagePlugins.push(
      new HtmlWebpackPlugin({
        filename: `${lang}/${pageName}.html`,
        template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
        inject: true,
      }),
    )
  })

  // merge plugins
  const plugins = dependencyHandlers().concat([
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    ...pagePlugins,
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ])

  const devConfig = merge(baseWebpackConfig, {
    name: lang,

    mode: 'development',

    entry: {
      ...pageEntries,
      app: [
        path.join(process.cwd(), 'app/app.js'),
        `webpack-hot-middleware/client?name=${lang}&reload=true`,
      ],
    },

    module: {
      rules: utils.styleLoaders({
        extract: false,
        sourceMap: config.dev.cssSourceMap,
      }),
    },

    // Don't use hashes in dev mode for better performance
    output: {
      filename: `${lang}/[name].js`,
    },

    optimization: {
      minimize: false,
    },

    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    plugins: plugins,
  })
  webpackConfigs.push(devConfig)
}

module.exports = webpackConfigs
