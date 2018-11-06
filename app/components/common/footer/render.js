const tpl = require('./footer.ejs')

module.exports = options =>
  tpl({
    title: 'PPIO',
    copyright: 'Copyright © 2018 PPIO Inc. All Rights Reserved.',
    theme: options.page === 'index' ? 'default' : 'white',
    social: [
      // {
      //   platform: 'facebook',
      //   link: 'https://www.facebook.com/PPIO-178595523020994/',
      // },
      {
        platform: 'twitter',
        link: 'https://twitter.com/PPLabs_PPIO',
      },
      {
        platform: 'medium',
        link: 'https://medium.com/@ppio',
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/channel/UCFRyuBY-PxoSaFmj5Evs5kQ',
      },
      {
        platform: 'linkedin',
        link: 'https://www.linkedin.com/company/ppio/',
      },
      {
        platform: 'github',
        link: 'https://github.com/ppio',
      },
    ],
  })
