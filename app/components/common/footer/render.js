const tpl = require('./footer.ejs')

module.exports = options =>
  tpl({
    title: 'PPIO',
    copyright: 'Copyright © 2018 PPIO Inc. All Rights Reserved.',
    theme: options.page === 'index' ? 'default' : 'white',
    social: [
      {
        platform: 'facebook',
        link: '',
      },
      {
        platform: 'twitter',
        link: '',
      },
      {
        platform: 'youtube',
        link: '',
      },
      {
        platform: 'linkedin',
        link: 'http://www.linkedin.com/company/ppio/',
      },
      {
        platform: 'github',
        link: '',
      },
    ],
  })
