/**
 * Created by dl on 2017-10-10.
 */
var soap = require('soap');
var co = require('co');
var url = 'http://10.150.4.100:7001/RemoteFacedeBean/RemoteFacedeBeanService?WSDL';
var args = {mobileCode: '13895652926'};

/*var createClient = function (url) {

 /!* return function (callback) {
 soap.createClient(url, callback);
 }*!/
 return new Promise(function (resolve, reject) {
 soap.createClient(url, function (err, client) {
 console.log('xxxxx123');
 if (err) return reject;
 return resolve(client);
 });
 })
 }*/

/*var biz = function (client, args) {
 return function (callback) {
 client.biz(args, callback);
 }
 }*/
var soaptest = function () {
    soap.createClient(url, function (err, client) {
        // console.log(client);
        client.biz(args, function (err, result) {
            console.log(result);
        });
    });
}


var doSometing = function () {
    console.log('doSomething');
}

var dothrid = function () {
    console.log('dothrid');
}
function createClient(url) {
    var promise = new Promise(function (resolve, reject) {
        soap.createClientAsync(url).then(client => {
            resolve(client)
        }).catch(e => {
            reject(e);
        });
    });
    return promise;
}

function biz(client, args) {
    var promise = new Promise(function (resolve, reject) {
        console.log('bizxxxxxx');
        client.biz(args, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
    return promise;
}
var error = true;
function test() {
    //promise处理异步函数的回调，这里简单的用一个error代表正确结果和非预期结果的判断条件
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (!error) {
                resolve("没错");
            } else {
                reject("有错");
            }
        }, 5000)
    });
    //test函数内部处理非预期结果。
    return promise;
}

/*testAnsy = async () => {
 let ret = await
 test();
 console.log('xxxxxxxret', ret);
 return ret;
 };

 await testAnsy();
 console.log('xxxxxxxxxxxxxxxxxxxxxx');*/

(async function () {
    console.log('Do some thing, ' + new Date());
    let ret = await test();
    console.log(ret);
    console.log('Do other things, ' + new Date());
})();


/*test().then(function (str) {
 console.log("成功了:" + str);
 }).catch(function (error) {
 console.log('失败了!');
 })*/

createClient(url).then(client => {
    console.log('client');
    return client
}).then(client => {
    console.log('start biz');
    return biz(client, args);
}).then(result => {
    console.log('result');
    console.log(result);
    return result;
}).catch(error => {
    console.log('error');
    //console.log(error);
})

doSometing();
/*var callWebService = soap.createClientAsync(url).then(client=>{
 return client.biz(args);
 }).then(function(data){
 console.log('xxx');
 }).catch(function (e) {
 console.log('err');
 console.log(e);
 });*/

/*
 yield createClient(url);
 yield doSometing();
 */




/*co(function*() {
 console.log('xxxx');
 yield createClient(url).then(function (client) {
 console.log(client);
 }).err(function (err) {
 console.log(err);
 })
 console.log(client);
 //yield data = yield biz(cliend, args);
 yield doSometing();
 yield dothrid();
 });*/

//soaptest();

