module.exports = options => {
  const tpl = require('./title.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    guideUrl: options.global.guideUrl,
    bigLogo: require('./img/big-logo.png'),
    bigLogo2x: require('./img/big-logo@2x.png'),
    title: transData.title,
    getStarted: transData.getStarted,
  })
}
