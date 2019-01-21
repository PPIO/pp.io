// cannot use ~App here, eslint will throw error
import '../../assets/css/style.scss'

import '../../components/common/header/css/header.scss'

import '../../components/index/title/css/title.scss'

import '../../components/index/download/css/download.scss'

import '../../components/index/advantages/css/advantages.scss'

import '../../components/index/scenario/css/scenario.scss'

import '../../components/index/community/css/community.scss'
import subscribe from '../../components/index/community/subscribe'
import menu from '../../components/common/header/menu'
import nav from '../../components/index/download/nav'

import '../../components/common/footer/css/footer.scss'

document.addEventListener('DOMContentLoaded', () => {
  subscribe()
  menu()
  nav()
})
