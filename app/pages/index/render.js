const headRenderer = require('../../components/head/render')
const headerRenderer = require('../../components/index/header/render')
const titleRenderer = require('../../components/index/title/render')
const advantagesRenderer = require('../../components/index/advantages/render')
const scenarioRenderer = require('../../components/index/scenario/render')
const communityRenderer = require('../../components/index/community/render')
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
    title: titleRenderer(options),
    advantages: advantagesRenderer(options),
    scenario: scenarioRenderer(options),
    community: communityRenderer(options),
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
