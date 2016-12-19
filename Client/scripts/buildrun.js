const build = require('./build.js');
const install = require('./install.js');
const run = require('./run.js');

module.exports = () => build().then(install).then(run);
