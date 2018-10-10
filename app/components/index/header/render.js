module.exports = options => {
  const tpl = require('./header.ejs')

  const transData = require('./translation.json')[options.lang]

  return tpl({
    lang: options.lang,
    title: 'PPIO',
    nav: [
      {
        name: transData.nav.intro,
        anchor: '#intro',
      },
      {
        name: transData.nav.install,
        anchor: '#labs',
      },
      {
        name: transData.nav.usage,
        anchor: '#join',
      },
      {
        name: transData.nav.support,
        anchor: '#community',
      },
    ],
  })
}
