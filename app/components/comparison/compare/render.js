module.exports = options => {
  const tpl = require('./compare.ejs')
  // const transData = require('./translation.json')[options.lang]
  return tpl({})
}
