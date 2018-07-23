import tpl from './main.hbs'

/* eslint-disable */
export default () =>
  tpl({
    introText: __I18n__('welcome!'),
    desText: __I18n__('this is a boilerplate'),
  })
