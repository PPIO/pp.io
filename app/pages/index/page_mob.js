// cannot use ~App here, eslint will throw error
import '../../assets/css/style_mob.scss'

import '../../components/common/header/css/header_mob.scss'
import headerMob from '../../components/common/header/header_mob'

import '../../components/index/title/css/title_mob.scss'

import '../../components/index/advantages/css/advantages_mob.scss'

import '../../components/index/scenario/css/scenario_mob.scss'

import '../../components/index/community/css/community_mob.scss'
import subscribe from '../../components/index/community/subscribe'

import '../../components/common/footer/css/footer_mob.scss'

document.addEventListener('DOMContentLoaded', () => {
  headerMob()
  subscribe()
})
