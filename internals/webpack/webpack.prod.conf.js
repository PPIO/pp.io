'use strict'

const path = require('path')
const { HashedModuleIdsPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const merge = require('webpack-merge')

const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

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

const webpackConfigs = []

for (let i = 0; i <= langList.length; i++) {
  const lang = langList[i] || null

  const pagesArr = utils.getPagesArr()
  const pagePlugins = []
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]
    console.log(pageName)
    pagePlugins.push(
      new HtmlWebpackPlugin({
        filename: `${lang || 'en'}/${pageName}.html`,
        template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
        inject: true,
        chunks: [`page/${pageName}`, 'common'],
        minify: {
          removeComments: true,
          collapseWhitespace: false,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    )
  })

  const pageEntries = {}
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]
    pageEntries[`page/${pageName}`] = path.resolve(utils.getPagesDir(), page)
  })

  const cssCacheGroups = {}
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]
    cssCacheGroups[`${pageName}Styles`] = {
      name: pageName,
      test: (m, c, entry = pageName) =>
        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      enforce: true,
    }
  })

  const curConfig = merge(baseWebpackConfig, {
    mode: 'production',

    entry: {
      ...pageEntries,
      app: path.join(process.cwd(), 'app/app.js'),
      common: path.join(process.cwd(), 'app/common/common.js'),
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
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
      ].concat(
        utils.styleLoaders({
          extract: true,
          sourceMap: config.build.productionSourceMap,
        }),
      ),
    },

    output: {
      path: config.build.assetsRoot,
      filename: `${lang || 'en'}/${utils.assetsPath(
        'js/[name].[chunkhash].js',
      )}`,
      chunkFilename: `${lang || 'en'}/${utils.assetsPath(
        'js/[name].[chunkhash].js',
      )}`,
    },

    optimization: {
      minimize: true,
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: cssCacheGroups,
      },
      runtimeChunk: 'single',
    },

    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true,
      }),
      // extract css into its own file
      new MiniCssExtractPlugin({
        filename: `${lang || 'en'}/${utils.assetsPath(
          'css/[name].[contentHash].css',
        )}`,
        chunkFilename: `${lang || 'en'}/${utils.assetsPath(
          'css/[name].[contentHash].css',
        )}`,
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true },
      }),
      ...pagePlugins,
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
    ],
    performance: {
      assetFilter: assetFilename =>
        !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    },
  })

  if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    curConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          `\\.(${config.build.productionGzipExtensions.join('|')})$`,
        ),
        threshold: 10240,
        minRatio: 0.8,
      }),
    )
  }

  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin
    curConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  webpackConfigs.push(curConfig)
}

module.exports = webpackConfigs
