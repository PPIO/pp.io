// banner animation
import UAParser from 'ua-parser-js'

const parser = new UAParser()
const uaResult = parser.getResult()
if (
  uaResult.browser.name === 'IE' &&
  parseFloat(uaResult.browser.version) < 10
) {
  document.addEventListener('DOMContentLoaded', () => {
    const hintDom = document.createElement('div')
    hintDom.setAttribute('class', 'browse-happy')
    hintDom.innerHTML = `You are using an old version of Internet Explorer. <a target="_blank" href="https://browsehappy.com/">Upgrading to modern browsers</a> to have a better browsing experience.`
    document.body.insertBefore(hintDom, document.querySelector('.ppio-header'))
  })
}
