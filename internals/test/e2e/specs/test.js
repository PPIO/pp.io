// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(`${devServer}/en/index.html`)
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('.logo')
      .assert.containsText('.ppio-big-title', 'Blockchain Storage Service')
      .assert.elementCount('.roadmap-events-line .event-block', 5)
      .end()
  },
}
