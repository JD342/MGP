const { exec } = require('child_process');
const getPkgName = require('./package_name.js');

module.exports = () => getPkgName().then((pkg) => new Promise((res, rej) => {

    // Check if package is installed, resolve true or false
    exec(`adb shell "pm list packages | grep ${pkg}"`, (err, stdout) => {
        if (err) { rej(err); return; }
        res(/package/.test(stdout));
    });

}));
