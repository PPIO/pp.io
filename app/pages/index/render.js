import tpl from './index.hbs'
import headRenderer from '../../components/head/render'
import headerRenderer from '../../components/index/header/render'
import mainRenderer from '../../components/index/main/render'
import footerRenderer from '../../components/index/footer/render'

export default tpl({
  head: headRenderer(),
  header: headerRenderer(),
  main: mainRenderer(),
  footer: footerRenderer(),
})
