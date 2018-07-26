import tpl from './index.hbs'
import headRenderer from '../../components/head/render'
import headerRenderer from '../../components/index/header/render'
import mainRenderer from '../../components/index/main/render'
import footerRenderer from '../../components/index/footer/render'

export default props => {
  const options = props.htmlWebpackPlugin.options
  return tpl({
    lang: options.lang || 'en',
    htmlLang: options.lang === 'zh' ? 'zh-cmn-Hans' : 'en',
    head: headRenderer(options),
    header: headerRenderer(options),
    main: mainRenderer(options),
    footer: footerRenderer(options),
  })
}
