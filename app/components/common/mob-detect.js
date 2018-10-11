import MobDetect from 'mobile-detect'

let md = new MobDetect(window.navigator.userAgent)

if (md.mobile()) {
  const href = window.location.href
  if (/\.html/.test(href) && !/_mob/.test(href)) {
    window.location.href = href.replace(/\.html/, '_mob.html')
  } else {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = `${href.replace(/\/$/, '')}/index_mob.html` // eslint-disable-line
    } else {
      window.location.href = `${href.replace(/\/$/, '')}/index_mob.html` // eslint-disable-line
    }
  }
}
