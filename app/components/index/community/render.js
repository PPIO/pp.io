module.exports = options => {
  const tpl = require('./community.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    isMob: options.isMob,
    title: transData.title,
    followTitle: transData.followTitle,
    joinTitle: transData.joinTitle,
    joinUs: transData.joinUs,
    subscribe: transData.subscribe,
    joinLink: 'https://discord.gg/8SR7cqt',
  })
}
