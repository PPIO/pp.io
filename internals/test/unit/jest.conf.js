const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.js$': path.resolve(
      __dirname,
      '../../..',
      './node_modules/babel-jest',
    ),
  },
  testPathIgnorePatterns: ['<rootDir>/test/e2e'],
  setupFiles: ['<rootDir>/test/unit/setup'],
}
