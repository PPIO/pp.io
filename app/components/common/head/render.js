module.exports = options => {
  const tpl = require('./head.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl(
    Object.assign(
      {
        favicon: require('../../../assets/img/favicon.png'),
        appIcon: require('../../../assets/img/icons/icon_128.png'),
        appIconL: require('../../../assets/img/icons/icon_144.png'),
        appIconXL: require('../../../assets/img/icons/icon_192.png'),
        appIconXXL: require('../../../assets/img/icons/icon_512.png'),
      },
      {
        title: transData.title,
        des: transData.des,
        keywords: transData.keywords,
        url: options.pageurl,
      },
    ),
  )
}
