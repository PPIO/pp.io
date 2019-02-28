module.exports = {
  indexUrl: process.env.NODE_ENV === 'production' ? 'https://www.pp.io' : '/',
  guideUrl: 'https://www.pp.io/docs/guide/',
  apiUrl: 'https://www.pp.io/docs/',
  blogUrl: 'https://blog.pp.io',
  forumUrl: 'https://discord.gg/wAUED89',
  githubUrl: 'https://github.com/ppio',
  downloadUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://www.pp.io/download.html'
      : '/en/download.html',
}
