import tpl from './footer.hbs'

/* eslint-disable */
export default () =>
  tpl({
    footerText: __I18n__('this is footer'),
  })
