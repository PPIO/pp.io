'use strict'
const path = require('path')
const glob = require('glob')
const config = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    })
  }
  return output
}

exports.getPagesArr = function() {
  const pagesDir = exports.getPagesDir()
  const globInstance = new glob.Glob('*/page.js', {
    cwd: pagesDir,
    sync: true,
  })
  return globInstance.found
}

exports.getPagesDir = function() {
  return path.resolve(process.cwd(), 'app/pages')
}

exports.getLangList = function(lang) {
  const appDir = path.resolve(process.cwd(), 'app/')
  const globInstance = new glob.Glob(`**/translations/${lang}.json`, {
    cwd: appDir,
    sync: true,
  })
  return globInstance.found
}
