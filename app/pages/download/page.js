// cannot use ~App here, eslint will throw error
import '../../assets/css/style.scss'

import '../../components/common/header/css/header.scss'

import '../../components/projects/projectList/css/projectList.scss'

import '../../components/common/footer/css/footer.scss'

import menu from '../../components/common/header/menu'

document.addEventListener('DOMContentLoaded', () => {
  menu()
})
