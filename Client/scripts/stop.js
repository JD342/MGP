const { exec } = require('child_process');
const getPkgName = require('./shared/package_name.js');

module.exports = () => new Promise((res, rej) => {

    console.log('Stopping');

    getPkgName().then((pkg) => new Promise((res, rej) => {

        exec(`adb shell am force-stop ${pkg}`, (err) => {
            if (err) {
                console.log('Stop failed')
                rej(err);
                return;
            }
            console.log('Stop completed');
            res();
        });

    })).then(res, rej);

});
