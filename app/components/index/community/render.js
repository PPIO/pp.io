module.exports = options => {
  const tpl = require('./community.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    title: transData.title,
    followTitle: transData.followTitle,
    joinTitle: transData.joinTitle,
    joinUs: transData.joinUs,
    subscribeUs: transData.subscribeUs,
    joinLink: '',
  })
}
