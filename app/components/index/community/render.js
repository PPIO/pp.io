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
    joinLink:
      'https://gitter.im/PPIO/chat?utm_source=share-link&utm_medium=link&utm_campaign=share-link',
  })
}
