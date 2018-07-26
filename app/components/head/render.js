import tpl from './head.hbs'
import translation from './translation.json'

export default options => tpl(translation[options.lang])
