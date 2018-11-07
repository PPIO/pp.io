const translation = require('./translation.json')

module.exports = options => {
  const tpl = options.isMob ? require('./head_mob.ejs') : require('./head.ejs')
  return tpl(
    Object.assign(
      {
        favicon: require('../../../assets/img/favicon.png'),
        appIcon: require('../../../assets/img/icons/icon_128.png'),
        appIconL: require('../../../assets/img/icons/icon_144.png'),
        appIconXL: require('../../../assets/img/icons/icon_192.png'),
      },
      translation[options.lang],
    ),
  )
}
