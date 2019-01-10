module.exports = options => {
  const tpl = require('./projectList.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    projects: [
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        url: '',
        cover: require('./img/cover-1.png'),
        cover2x: options.isMob
          ? require('./img/cover-1.png')
          : require('./img/cover-1@2x.png'),
        cover3x: require('./img/cover-1@2x.png'),
        platform: transData.projectPlatform_1,
      },
      {
        title: transData.projectTitle_2,
        intro: transData.projectIntro_2,
        url: '',
        cover: require('./img/cover-2.png'),
        cover2x: options.isMob
          ? require('./img/cover-2.png')
          : require('./img/cover-2@2x.png'),
        cover3x: require('./img/cover-2@2x.png'),
        platform: transData.projectPlatform_2,
      },
      {
        title: transData.projectTitle_3,
        intro: transData.projectIntro_3,
        url: '',
        cover: require('./img/cover-3.png'),
        cover2x: options.isMob
          ? require('./img/cover-3.png')
          : require('./img/cover-3@2x.png'),
        cover3x: require('./img/cover-3@2x.png'),
        platform: transData.projectPlatform_3,
      },
      {
        title: transData.projectTitle_4,
        intro: transData.projectIntro_4,
        url: '',
        cover: require('./img/cover-4.png'),
        cover2x: options.isMob
          ? require('./img/cover-4.png')
          : require('./img/cover-4@2x.png'),
        cover3x: require('./img/cover-4@2x.png'),
        platform: transData.projectPlatform_4,
      },
    ],
  })
}
