'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const merge = require('webpack-merge')

const config = require('./config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const logger = require('../../server/logger')

// i18n 多语言，export 多套 webpack 配置
const langList = config.lang
const langConfigs = {}
langList.forEach(lang => {
  const wholeConfig = {}
  utils.getLangList(lang).forEach(configPath => {
    const config = require(`../../app/${configPath}`)
    Object.assign(wholeConfig, config)
  })
  langConfigs[lang] = wholeConfig
})

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
   * 需要在 dllConfig.exclude 中排除所有 server 的依赖
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

  // 如果 dlls 被指定 自动为每一项创建 dllPlugin.
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
  const lang = langList[i] || null
  // entries
  const pageEntries = {}
  const pagesArr = utils.getPagesArr()
  pagesArr.forEach(page => {
    pageEntries[page] = [
      path.resolve(utils.getPagesDir(), page.split('.')[0]),
      'webpack-hot-middleware/client',
    ]
  })

  // HTML webpack plugins
  const pagePlugins = []
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]
    pagePlugins.push(
      new HtmlWebpackPlugin({
        filename: `${lang || 'en'}/${pageName}.html`,
        template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
        inject: true,
      }),
    )
  })

  // 所有 plugins
  const plugins = dependencyHandlers().concat([
    new StringReplacePlugin(),
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
    mode: 'development',

    entry: {
      ...pageEntries,
      app: [
        path.join(process.cwd(), 'app/app.js'),
        'webpack-hot-middleware/client',
      ],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|dlls)/,
          use: [
            {
              loader: StringReplacePlugin.replace({
                replacements: [
                  {
                    pattern: /__I18n__\(['"](.*?)['"]\)/gi,
                    replacement: (match, p1) => {
                      if (!langConfigs[lang]) return `'${p1}'`
                      return `'${langConfigs[lang][p1]}'` || `'${p1}'`
                    },
                  },
                ],
              }),
            },
            'babel-loader',
          ],
        },
      ],
    },

    // Don't use hashes in dev mode for better performance
    output: {
      // path: path.resolve(config.build.assetsRoot, lang || 'en'),
      filename: `${lang || 'en'}/[name].js`,
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
