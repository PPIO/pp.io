'use strict'

const path = require('path')
const fs = require('fs')
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
const isSingleLang = langList.length === 1 // Whether the website only needs one language. In which case we will not add language-info in filenames
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

    pagePlugins.push(
      new HtmlWebpackPlugin(
        Object.assign({}, pluginConfig, {
          filename: `${pageName}${isSingleLang ? '' : `_${lang}`}.html`,
          template: path.join(utils.getPagesDir(), `./${pageName}/render.js`),
          chunks: [
            'picturefill',
            'mob-detect',
            'browsehappy',
            `page/${pageName}`,
            'vendor',
            'runtime',
          ],
          isMob: false,
          inject: false,
          lang,
          headChunks: ['mob-detect', 'picturefill', 'browsehappy'],
        }),
      ),
    )

    // for mobile page
    pagePlugins.push(
      new HtmlWebpackPlugin(
        Object.assign({}, pluginConfig, {
          filename: `${pageName}${isSingleLang ? '' : `_${lang}`}_mob.html`,
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
      filename: `${isSingleLang ? '' : `${lang}/`}${utils.assetsPath(
        'js/[name].[chunkhash].js',
      )}`,
      chunkFilename: `${isSingleLang ? '' : `${lang}/`}${utils.assetsPath(
        'js/[name].[chunkhash].js',
      )}`,
    },

    optimization: {
      minimize: true,
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
      splitChunks: {
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
      new MiniCssExtractPlugin({
        filename: `${isSingleLang ? '' : `${lang}/`}${utils.assetsPath(
          'css/style-[name].[contentHash].css',
        )}`,
        chunkFilename: `${isSingleLang ? '' : `${lang}/`}${utils.assetsPath(
          'css/style-[name].[contentHash].css',
        )}`,
      }),
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
      // copy all files in /public dir
      new CopyWebpackPlugin([
        {
          from: path.join(process.cwd(), './public'),
          to: path.join(process.cwd(), './dist'),
          flatten: true,
        },
      ]),
      // compress images
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disabled during development
        // speed up optipng with cache
        // WARNING: Imagemin plugin WILL NOT intelligently clear the cache if you update the options. REMEMBER to clear it.
        cacheFolder: path.join(process.cwd(), './imagemin-cache'),
        plugins: [
          imageminMozjpeg({
            quality: 80,
            progressive: true,
          }),
        ],
        gifsicle: {
          interlaced: false,
          optimizationLevel: 3,
          colors: 128,
        },
        optipng: {
          optimizationLevel: 3,
        },
        pngquant: null,
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
