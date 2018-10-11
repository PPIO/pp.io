module.exports = options => {
  const tpl = require('./scenario.ejs')
  const transData = require('./translation.json')[options.lang]
  const sceKeys = Object.keys(transData)
    .filter(key => key.match('sceTitle'))
    .map(key => key.split('_')[1])
  console.log(sceKeys)
  return tpl({
    title: transData.title,
    scenarios: sceKeys.map(key => ({
      title: transData[`sceTitle_${key}`],
      intro: transData[`sceIntro_${key}`],
      icon: require(`./img/scenario_${key}.png`),
      icon2x: require(`./img/scenario_${key}@2x.png`),
      icon3x: require(`./img/scenario_${key}@3x.png`),
    })),
  })
}
