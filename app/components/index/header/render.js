import tpl from './header.hbs'
import translation from './translation.json'

export default options =>
  tpl(
    Object.assign(
      {
        title: 'Boilerplate',
      },
      translation[options.lang],
    ),
  )
