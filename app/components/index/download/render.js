module.exports = options => {
  const tpl = require('./download.ejs')
  // const transData = require('./translation.json')[options.lang]
  return tpl({})
}
