module.exports = options => {
  const tpl = require('./projectList.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    projects: [
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        cover: require('./img/demo.png'),
        cover2x: require('./img/demo@2x.png'),
        cover3x: require('./img/demo@2x.png'),
        platform: transData.projectPlatform_1,
      },
      {
        title: transData.projectTitle_2,
        intro: transData.projectIntro_2,
        cover: require('./img/poss_cli.png'),
        cover2x: require('./img/poss_cli@2x.png'),
        cover3x: require('./img/poss_cli@2x.png'),
        platform: transData.projectPlatform_2,
      },
      {
        title: transData.projectTitle_3,
        intro: transData.projectIntro_3,
        cover: require('./img/poss_sdk.png'),
        cover2x: require('./img/poss_sdk@2x.png'),
        cover3x: require('./img/poss_sdk@2x.png'),
        platform: transData.projectPlatform_3,
      },
    ],
  })
}
