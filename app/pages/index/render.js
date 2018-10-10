const headRenderer = require('../../components/head/render')
const headerRenderer = require('../../components/index/header/render')
const mainRenderer = require('../../components/index/main/render')
const footerRenderer = require('../../components/index/footer/render')

const getLangProp = require('../../render-utils').getLangProp

module.exports = props => {
  const options = props.htmlWebpackPlugin.options

  const tpl = require('./index.ejs')

  const commonComponents = {
    lang: options.lang || 'en',
    htmlLang: getLangProp(options.lang),
    head: headRenderer(options),
    header: headerRenderer(options),
    main: mainRenderer(options),
    footer: footerRenderer(options),
  }

  // put headscripts into <head>, specified in htmlWebpackPlugin config
  const chunks = props.htmlWebpackPlugin.files.chunks
  const headScripts = []
  let cssChunks = []
  const bodyScripts = []
  for (const chunk in chunks) {
    if (!chunks.hasOwnProperty(chunk)) {
      continue
    }
    if (options.headChunks.indexOf(chunk) !== -1) {
      headScripts.push(chunks[chunk].entry)
    } else {
      bodyScripts.push(chunks[chunk].entry)
    }
    cssChunks = cssChunks.concat(chunks[chunk].css)
  }

  return tpl(
    Object.assign(commonComponents, {
      headScripts,
      cssChunks,
      bodyScripts,
    }),
  )
}
