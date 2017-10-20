/**
 * Created by dl on 2017-10-11.
 */
'use strict'
const _parseString = require('xml2js').parseString;

async function parseString (xml) {
    const promise = new Promise((resolve, reject) => {
        _parseString(xml, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
    return promise;
}
module.exports = { parseString }
