import tpl from './head.hbs'

/* eslint-disable */
export default () =>
  tpl({
    title: __I18n__('welcome'),
    des: __I18n__('this is the description'),
    keywords: __I18n__('front-end, html5, css, javascript, i18n, boilerplate'),
  })
/* eslint-enable */
