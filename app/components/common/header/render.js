module.exports = options => {
  const tpl = options.isMob
    ? require('./header_mob.ejs')
    : require('./header.ejs')

  const transData = require('./translation.json')[options.lang]
  return tpl({
    lang: options.lang,
    title: 'PPIO',
    curPage: options.page,
    theme: options.page === 'index' ? 'default' : 'white',
    indexUrl: process.env.NODE_ENV === 'production' ? 'https://pp.io' : '/en',
    nav: [
      {
        page: 'guide',
        name: transData.nav.guide,
        href: options.global.guideUrl,
      },
      {
        page: 'api',
        name: transData.nav.api,
        href: options.global.apiUrl,
      },
      {
        page: 'projects',
        name: transData.nav.projects,
        href: process.env.NODE_ENV === 'production' ? '/projects.html' : '/en/projects.html',
      },
      {
        page: 'blog',
        name: transData.nav.blog,
        href: options.global.blogUrl,
      },
      {
        page: 'github',
        name: transData.nav.github,
        href: options.global.githubUrl,
      },
    ],
  })
}
