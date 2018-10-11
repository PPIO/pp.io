module.exports = options => {
  const tpl = require('./projectList.ejs')
  const transData = require('./translation.json')[options.lang]
  return tpl({
    projects: [
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        url: '',
        disabled: true,
        cover: require('./img/cover-1.png'),
        cover2x: options.isMob
          ? require('./img/cover-1.png')
          : require('./img/cover-1@2x.png'),
        cover3x: require('./img/cover-1@2x.png'),
      },
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        url: '',
        disabled: true,
        cover: require('./img/cover-2.png'),
        cover2x: options.isMob
          ? require('./img/cover-2.png')
          : require('./img/cover-2@2x.png'),
        cover3x: require('./img/cover-2@2x.png'),
      },
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        url: '',
        disabled: true,
        cover: require('./img/cover-3.png'),
        cover2x: options.isMob
          ? require('./img/cover-3.png')
          : require('./img/cover-3@2x.png'),
        cover3x: require('./img/cover-3@2x.png'),
      },
      {
        title: transData.projectTitle_1,
        intro: transData.projectIntro_1,
        url: '',
        disabled: true,
        cover: require('./img/cover-4.png'),
        cover2x: options.isMob
          ? require('./img/cover-4.png')
          : require('./img/cover-4@2x.png'),
        cover3x: require('./img/cover-4@2x.png'),
      },
    ],
  })
}
