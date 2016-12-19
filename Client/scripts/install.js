const { access, constants: { F_OK } } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const build = require('./build.js');

const apk = join(
    'platforms',
    'android',
    'build',
    'outputs',
    'apk',
    'android-debug.apk'
);

module.exports = () => new Promise((res, rej) => {

    console.log('Installing');

    // Make build if it doesn't exist
    access(apk, F_OK, (err) => {
        if (err) {
            console.log('Build not found');
            build().then(res, rej);
            return;
        }
        res();
    });

}).then(() => new Promise((res, rej) => {

    // Run installation
    exec(`adb install -r "${apk}"`, (err) => {
        if (err) {
            console.log('Install failed');
            rej(err);
            return;
        }
        console.log('Install completed');
        res();
    });

}));
