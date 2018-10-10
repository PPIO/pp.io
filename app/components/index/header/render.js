module.exports = options => {
  const tpl = options.isMob
    ? require('./header_mob.ejs')
    : require('./header.ejs')

  const transData = require('./translation.json')[options.lang]

  return tpl({
    lang: options.lang,
    title: 'PPIO',
    nav: [
      {
        name: transData.nav.guide,
        href: '',
      },
      {
        name: transData.nav.api,
        href: '',
      },
      {
        name: transData.nav.blog,
        href: '',
      },
      {
        name: transData.nav.projects,
        href: '',
      },
      {
        name: transData.nav.github,
        href: '',
      },
    ],
  })
}
