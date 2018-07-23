// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0);
}

require('shelljs/global');

const path = require('path');
const fs = require('fs');
const exists = fs.existsSync;
const writeFile = fs.writeFileSync;

const defaults = require('lodash/defaultsDeep');
const config = require('../webpack/config');
const dllConfig = config.dllPlugin.defaults
const dllManifestPath = path.join(dllConfig.path, 'manifest.json');

/**
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdir('-p', dllConfig.path);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */

console.log(dllManifestPath)
console.log(exists(dllManifestPath))
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      {
        private: true,
      },
      null,
      2,
    ),
    'utf8',
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec(
  'cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.conf.js --hide-modules',
);
