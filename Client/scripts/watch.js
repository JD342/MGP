const { join } = require('path')
const monocle = require('monocle')();
const buildAndRun = require('./buildrun.js');
const run = require('./run.js');

module.exports = () => {

    console.log('Watching for changes in project');

    var chain = run().then(() => { chain = null; });
    var buildQueued = false;

    var listener = () => {

        if (buildQueued) return;

        if (chain) {

            buildQueued = true;

            chain.then(() => {
                buildQueued = false;
                return chain = buildAndRun().then(() => { chain = null; });
            });

            return;

        }

        chain = buildAndRun().then(() => { chain = null });

    }

    monocle.watchDirectory({
        root: 'www',
        listener
    });

};
