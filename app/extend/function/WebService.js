/**
 * Created by dl on 2017-10-10.
 */
'use strict'
const soap = require('soap');

async function createClient(url) {
    const promise = new Promise(function (resolve, reject) {
        soap.createClientAsync(url).then(client => {
            resolve(client)
        }).catch(e => {
            reject(e);
        });
    });
    return promise;
}

async function biz(client, args) {
    const promise = new Promise(function (resolve, reject) {
        console.log('bizxxxxxx');
        client.biz(args, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
    return promise;
}

async function callWebService(url, args) {
    console.log('call createClient');
    const client = await createClient(url);
    const data = await biz(client, args);
    return data;

}
module.exports = {callWebService};