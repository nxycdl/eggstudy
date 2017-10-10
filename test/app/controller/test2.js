/**
 * Created by dl on 2017-10-10.
 */
const webservice = require('./../../../app/extend/function/WebService');
const url = 'http://10.150.4.1:7001/RemoteFacedeBean/RemoteFacedeBeanService?WSDL';
const args = {mobileCode: '13895652926'};
//let client = webservice.createClient(url);
/*const getClient = async function () {
    console.log('1');
    let client;
    try {
        client = await webservice.createClient(url);
    } catch (e) {
        const err = e.message;
        console.log(err);
        return {err: e.message, data: {}};
    }
    let data;
    try {
        data = await webservice.biz(client, args);
    } catch (e) {
        const err = e.message;
        console.log(err);
        return {err: e.message, data: {}};
    }
    return {err: '', data: data};

}
let client = await webservice.createClient(url);
console.log(client);*/



console.log(ret);
console.log('3');
