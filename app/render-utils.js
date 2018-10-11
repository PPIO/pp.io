const getLangProp = optLang => {
  let htmlLang = ''
  switch (optLang) {
    case 'zh':
      htmlLang = 'zh-cmn-Hans'
      break
    case 'en':
      htmlLang = 'en'
      break
    default:
      htmlLang = 'en'
  }
  return htmlLang
}

module.exports = { getLangProp }
