const { exec } = require('child_process');
const getPackageName = require('./shared/package_name.js');
const checkIfIsInstalled = require('./shared/is_installed.js');
const install = require('./install.js');
const stop = require('./stop.js');

module.exports = () => new Promise((res, rej) => {

    console.log('Running');

    Promise.all([

        getPackageName(),

        checkIfIsInstalled().then((installed) => new Promise((res, rej) => {

            if (installed) {
                res();
                return;
            }

            // If app is not installed, install it
            console.log('App is not installed');
            install().then(res, rej);

        }))

    ]).then(([pkg]) => new Promise((res, rej) => {

        // Start the app
        exec(`adb shell monkey -p ${pkg} 1`, (err) => {
            if (err) {
                console.log('App failed to start');
                rej(err);
                return;
            }
            console.log('App started');
            res();
        });

    })).then(res, rej);

});
