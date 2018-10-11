// cannot use ~App here, eslint will throw error
import '../../assets/css/style_mob.scss'

import '../../components/common/header/css/header_mob.scss'
import headerMob from '../../components/common/header/header_mob'

import '../../components/projects/projectList/css/projectList_mob.scss'

import '../../components/common/footer/css/footer_mob.scss'

document.addEventListener('DOMContentLoaded', () => {
  headerMob()
})
