module.exports = {
  indexUrl: process.env.NODE_ENV === 'production' ? 'https://www.pp.io' : '/',
  mobIndexUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://www.pp.io/index_mob.html'
      : '/index_mob.html',
  guideUrl: 'https://www.pp.io/docs/guide/',
  apiUrl: 'https://www.pp.io/docs/api/',
  blogUrl: 'https://blog.pp.io',
  githubUrl: 'https://github.com/ppio',
  projectsUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://www.pp.io/projects.html'
      : '/projects.html',
  mobProjectsUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://www.pp.io/projects_mob.html'
      : '/projects_mob.html',
}
