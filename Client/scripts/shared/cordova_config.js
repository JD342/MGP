const { readFile } = require('fs');
const { parseXml } = require('libxmljs');

var config;

module.exports = () => Promise.resolve(config || new Promise((res, rej) => {

    readFile('config.xml', 'utf8', (err, xml) => {
        if (err) { rej(err); return; }
        try { config = parseXml(xml); }
        catch (err) { rej(err); return; }
        res(config);
    });

}));
