const langGetter = (lang, translation) => {
  let pageText = {}
  if (lang === 'zh') {
    pageText = translation['zh']
  } else {
    pageText = translation['en']
  }
  return pageText
}

export { langGetter }
