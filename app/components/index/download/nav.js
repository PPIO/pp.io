/*
 * add menu animation for mobile
 */

export default () => {
  const navHandler = document.querySelector('#download .ppio-download-nav')
  navHandler.addEventListener('click', e => {
    if (e.target.classList.contains('active')) {
      return
    } else {
      let navALL = document.querySelectorAll('#download .nav-item')
      let contentALL = document.querySelectorAll('#download .content-item')
      let index = 0
      for (let i = 0; i < navALL.length; i++) {
        let item = navALL[i]
        if (item === e.target) {
          index = i
        }
        item.classList.remove('active')
        e.target.classList.add('active')
      }

      for (let i = 0; i < contentALL.length; i++) {
        contentALL[i].classList.remove('active')
      }
      contentALL[index].classList.add('active')
    }
    e.stopPropagation()
  })
}
