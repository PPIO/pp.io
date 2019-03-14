/* global gtag_report_conversion */
import axios from 'axios'
import qs from 'qs'

export default () => {
  const joinBtn = document.querySelector('#join-btn')
  const subscribeBtn = document.querySelector('.subscribe-btn')
  const emailInput = document.querySelector('#subscribe-email')
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

  joinBtn.addEventListener('click', () => {
    gtag_report_conversion('https://discord.gg/8SR7cqt')
  })

  subscribeBtn.addEventListener('click', () => {
    if (
      subscribeBtn.classList.contains('loading') ||
      subscribeBtn.classList.contains('success')
    ) {
      return
    }
    if (!emailRegex.test(emailInput.value)) {
      return alert('Please enter valid email address!')
    }
    subscribeBtn.classList.add('loading')
    axios({
      url: 'https://blog.pp.io/subscribe',
      method: 'POST',
      data: qs.stringify({
        email: emailInput.value,
        confirm: '',
        location: window.location.href,
        referer: '',
      }),
    })
      .then(res => {
        subscribeBtn.classList.remove('loading')
        if (res.data.match("You've successfully subscribed to")) {
          return subscribeBtn.classList.add('success')
        }
        return alert('Subscribe failed. Please try again later.')
      })
      .catch(() => alert('Subscribe failed. Please try again later.'))
  })
}
