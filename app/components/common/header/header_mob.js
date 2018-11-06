/*
 * add menu animation for mobile
 */

export default () => {
  const navHandler = document.querySelector('.nav-handler')
  const nav = document.querySelector('.nav')
  const headerContainer = document.querySelector('.ppio-header .container')

  navHandler.addEventListener('click', () => {
    showDropDown(!navHandler.classList.contains('on'))
  })

  document.body.addEventListener('click', () => {
    showDropDown(false)
  })

  navHandler.addEventListener('click', e => {
    e.stopPropagation()
  })

  nav.addEventListener('click', e => {
    if (!e.target.classList.contains('nav-item')) {
      e.stopPropagation()
    }
  })

  headerContainer.addEventListener('click', e => {
    e.stopPropagation()
  })

  function showDropDown(toShow) {
    if (toShow) {
      navHandler.classList.add('on')
      nav.classList.add('dropdown')
      headerContainer.classList.add('dropdown')
      document.body.classList.add('dropdown')
    } else {
      navHandler.classList.remove('on')
      nav.classList.remove('dropdown')
      headerContainer.classList.remove('dropdown')
      document.body.classList.remove('dropdown')
    }
  }
}
