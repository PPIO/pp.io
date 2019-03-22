/*
 * add menu animation for mobile
 */
/* global gtag_report_conversion, fbq */

export default () => {
  const navHandler = document.querySelector('.nav-handler')
  const nav = document.querySelector('.nav')
  const headerContainer = document.querySelector('.ppio-header .container')
  const discordBtn = document.querySelector('#nav-discord')

  discordBtn.addEventListener('click', () => {
    fbq('track', 'StartTrial')
    gtag_report_conversion('https://discord.gg/8SR7cqt')
  })

  navHandler.addEventListener('click', e => {
    showDropDown(!navHandler.classList.contains('on'))
    e.stopPropagation()
  })

  function showDropDown(toShow) {
    if (toShow) {
      navHandler.classList.add('on')
      nav.classList.add('dropdown')
      headerContainer.classList.add('dropdown')
      document.body.classList.add('dropdown')
      document.body.addEventListener('touchmove', preventScroll, {
        passive: false,
      })
    } else {
      navHandler.classList.remove('on')
      nav.classList.remove('dropdown')
      headerContainer.classList.remove('dropdown')
      document.body.classList.remove('dropdown')
      document.body.removeEventListener('touchmove', preventScroll, {
        passive: false,
      })
    }
  }

  function preventScroll(e) {
    e.preventDefault()
  }
}
