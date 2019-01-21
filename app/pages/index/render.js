const headRenderer = require('../../components/common/head/render')
const headerRenderer = require('../../components/common/header/render')
const titleRenderer = require('../../components/index/title/render')
const downloadRenderer = require('../../components/index/download/render')
const advantagesRenderer = require('../../components/index/advantages/render')
const scenarioRenderer = require('../../components/index/scenario/render')
const communityRenderer = require('../../components/index/community/render')
const footerRenderer = require('../../components/common/footer/render')
const globalParam = require('../globalParam')

const getLangProp = require('../../render-utils').getLangProp

module.exports = props => {
  const options = props.htmlWebpackPlugin.options
  options.page = 'index'

  options.global = globalParam

  options.pageurl = 'https://pp.io'

  const tpl = require('./index.ejs')

  const commonComponents = {
    topImage: require('../../assets/img/icons/icon_192.png'),
    lang: options.lang || 'en',
    htmlLang: getLangProp(options.lang),
    head: headRenderer(options),
    header: headerRenderer(options),
    title: titleRenderer(options),
    download: downloadRenderer(options),
    advantages: advantagesRenderer(options),
    scenario: scenarioRenderer(options),
    community: communityRenderer(options),
    footer: footerRenderer(options),
    prefetchLinks: [
      {
        page: 'guide',
        href: options.global.guideUrl,
      },
      {
        page: 'api',
        href: options.global.apiUrl,
      },
      {
        page: 'projects',
        href: options.isMob
          ? options.global.mobProjectsUrl
          : options.global.projectsUrl,
      },
      {
        page: 'blog',
        href: options.global.blogUrl,
      },
      {
        page: 'github',
        href: options.global.githubUrl,
      },
    ],
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
