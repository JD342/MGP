const { exec } = require('child_process');

module.exports = () => new Promise((res, rej) => {

    console.log('Building');

    // Build apk
    exec('cordova build android', (err) => {
        if (err) {
            console.log('Build failed');
            rej(err);
            return;
        }
        console.log('Build completed');
        res();
    });

});
