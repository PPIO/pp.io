module.exports = options => {
  const tpl = require('./advantages.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    title: transData.title,
    advantages: [
      {
        name: 'affordable',
        title: transData.advTitle_aff,
        intro: transData.advIntro_aff,
        icon: require('./img/advantage_aff.png'),
        icon2x: require('./img/advantage_aff@2x.png'),
        icon3x: require('./img/advantage_aff@3x.png'),
      },
      {
        name: 'secure',
        title: transData.advTitle_sec,
        intro: transData.advIntro_sec,
        icon: require('./img/advantage_sec.png'),
        icon2x: require('./img/advantage_sec@2x.png'),
        icon3x: require('./img/advantage_sec@3x.png'),
      },
      {
        name: 'efficient',
        title: transData.advTitle_eff,
        intro: transData.advIntro_eff,
        icon: require('./img/advantage_eff.png'),
        icon2x: require('./img/advantage_eff@2x.png'),
        icon3x: require('./img/advantage_eff@3x.png'),
      },
    ],
  })
}
