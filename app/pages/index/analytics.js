/* global ga */
export default () => {
  // index page getstarted button
  document.querySelector('.getstarted').addEventListener('click', () => {
    ga('send', 'event', 'getstarted', 'click')
  })

  // index page download analytics
  const downloadBlock = document.querySelector('#download')
  downloadBlock.addEventListener('click', e => {
    if (e.target.nodeName.toLocaleLowerCase() === 'span') {
      const parentNode = e.target.parentNode
      if (parentNode.classList.contains('platform-btn')) {
        ga('send', 'event', 'download', 'click', parentNode.dataset.type)
      }
    }

    if (e.target.classList.contains('platform-btn')) {
      ga('send', 'event', 'download', 'click', e.target.dataset.type)
    }
  })

  // index page advantages analytics
  const advantagesContent = document.querySelector('.advantages-content')
  advantagesContent.addEventListener('click', e => {
    let target = e.target
    while (target !== e.currentTarget) {
      if (target.classList.contains('advantage-block')) {
        ga('send', 'event', 'advantages', 'click', target.dataset.type)
        break
      } else {
        target = target.parentNode
      }
    }
  })
}
