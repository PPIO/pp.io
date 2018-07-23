import tpl from './header.hbs'

/* eslint-disable no-undef */
export default () =>
  tpl({
    title: 'Title',
    des: __I18n__('this is a description'),
    nav: {
      intro: __I18n__('Intro'),
      main: __I18n__('Main'),
      team: __I18n__('Team'),
      support: __I18n__('Support'),
      partner: __I18n__('Partner'),
    },
  })
/* eslint-enable */
