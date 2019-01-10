module.exports = {
  indexUrl: process.env.NODE_ENV === 'production' ? 'https://www.pp.io' : '/',
  guideUrl: 'https://www.pp.io/docs/guide/',
  apiUrl: 'https://www.pp.io/docs/',
  blogUrl: 'https://blog.pp.io',
  githubUrl: 'https://github.com/ppio',
  projectsUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://www.pp.io/projects.html'
      : '/projects.html',
}
