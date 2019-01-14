module.exports = options => {
  const tpl = require('./header.ejs')

  const transData = require('./translation.json')[options.lang]
  return tpl({
    lang: options.lang,
    title: 'PPIO',
    curPage: options.page,
    theme: options.page === 'index' ? 'default' : 'white',
    indexUrl: options.isMob
      ? options.global.mobIndexUrl
      : options.global.indexUrl,
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
        href: options.isMob
          ? options.global.mobProjectsUrl
          : options.global.projectsUrl,
      },
      {
        page: 'blog',
        name: transData.nav.blog,
        href: options.global.blogUrl,
      },
      {
        page: 'forum',
        name: transData.nav.forum,
        href: options.global.forumUrl,
      },
      {
        page: 'github',
        name: transData.nav.github,
        href: options.global.githubUrl,
      },
    ],
  })
}
