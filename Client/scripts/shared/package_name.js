const getCordovaConfig = require('./cordova_config.js');

var name;

module.exports = () => Promise.resolve(
    name || getCordovaConfig().then((config) => {
        name = config.get('/*/@id').value();
        return name;
    })
);
