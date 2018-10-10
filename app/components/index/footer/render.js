const tpl = require('./footer.ejs')

module.exports = () =>
  tpl({
    title: 'PPIO',
    copyright: 'Copyright © PPIO Team 2018 PPIO Foundation',
    social: [
      {
        platform: 'facebook',
        link: '',
      },
      {
        platform: 'youtube',
        link: '',
      },
      {
        platform: 'twitter',
        link: '',
      },
      {
        platform: 'github',
        link: '',
      },
      {
        platform: 'linkedin',
        link: '',
      },
    ],
  })
