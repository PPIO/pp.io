module.exports = options => {
  const tpl = require('./main.ejs')

  const transData = require('./translation.json')[options.lang]

  return tpl({
    introText: transData.introText,
    desText: transData.desText,
  })
}
