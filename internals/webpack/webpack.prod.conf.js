'use strict'

const path = require('path')
const fs = require('fs')
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
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

// export multiple webpack configs to support multi languages
const langList = config.lang
const webpackConfigs = langList.map(lang => {
  const pagesArr = utils.getPagesArr()
  const pagePlugins = []
  const pageEntries = {}
  const splitChunksGroups = {}
  pagesArr.forEach(page => {
    const pageName = page.split('/')[0]

    const pluginConfig = {
      lang,
      inject: true,
      isMob: false,
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
    }

    if (pageName === 'webgl-test') {
      return
    }

    pagePlugins.push(
      new HtmlWebpackPlugin(
        Object.assign({}, pluginConfig, {
          filename: `${pageName}_${lang}.html`,
          template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
          chunks: ['picturefill', `page/${pageName}`, 'vendor', 'runtime'],
          isMob: false,
          inject: false,
          lang,
          headChunks: ['picturefill'],
        }),
      ),
    )

    // for mobile page
    pagePlugins.push(
      new HtmlWebpackPlugin(
        Object.assign({}, pluginConfig, {
          filename: `${pageName}_${lang}_mob.html`,
          template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
          chunks: [
            'picturefill',
            `page/${pageName}_mob`,
            'vendor_mob',
            'runtime',
          ],
          isMob: true,
          inject: false,
          lang,
          headChunks: ['picturefill'],
        }),
      ),
    )

    // entries
    pageEntries[`page/${pageName}`] = path.resolve(utils.getPagesDir(), page)
    // for mobile page
    const mobEntryPath = path.resolve(utils.getPagesDir(), `${page}_mob.js`)
    if (fs.existsSync(mobEntryPath)) {
      pageEntries[`page/${pageName}_mob`] = path.resolve(
        utils.getPagesDir(),
        `${page}_mob`,
      )
    }

    // cacheGroups
    splitChunksGroups[`style_${pageName}`] = {
      name: `style_${pageName}`,
      test: (m, c, entry = pageName) =>
        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      enforce: true,
    }
  })

  splitChunksGroups['vendor'] = {
    name: 'vendor',
    test: /[\\/]node_modules[\\/]/,
    chunks: chunk => !/_mob/.test(chunk.name),
    enforce: true,
  }
  splitChunksGroups['vendor_mob'] = {
    name: 'vendor_mob',
    test: /[\\/]node_modules[\\/]/,
    chunks: chunk => /_mob/.test(chunk.name),
    enforce: true,
  }

  const curConfig = merge(baseWebpackConfig, {
    name: lang,

    mode: 'production',

    entry: {
      ...pageEntries,
    },

    module: {
      rules: utils.styleLoaders({
        extract: true,
        sourceMap: config.build.productionSourceMap,
      }),
    },

    output: {
      path: config.build.assetsRoot,
      filename: `${lang}/${utils.assetsPath('js/[name].[chunkhash].js')}`,
      chunkFilename: `${lang}/${utils.assetsPath('js/[name].[chunkhash].js')}`,
    },

    optimization: {
      minimize: true,
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
      splitChunks: {
        // chunks: 'all',
        cacheGroups: splitChunksGroups,
      },
      runtimeChunk: 'single',
    },

    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    plugins: [
      new DefinePlugin({
        LANGUAGE: JSON.stringify(lang),
      }),
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
        filename: `${lang}/${utils.assetsPath(
          'css/style-[name].[contentHash].css',
        )}`,
        chunkFilename: `${lang}/${utils.assetsPath(
          'css/style-[name].[contentHash].css',
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

  return curConfig
})

module.exports = webpackConfigs
