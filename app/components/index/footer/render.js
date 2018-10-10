const tpl = require('./footer.ejs')

module.exports = () =>
  tpl({
    footerText: 'this is footer',
  })
