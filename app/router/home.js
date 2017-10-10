'use strict'
/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = app => {
    // 路由方式1 ,指定controller.method;
    app.get('/', 'home.index');
    // 路由方式2,app.controller.name.method;
    app.get('/index', app.controller.home.index);

    app.get('/postForm', app.controller.home.postForm);

    app.post('/postFormSub', app.controller.home.postFormSub);

    app.get('/dbTestTrans', app.controller.home.dbTestTrans);
    app.get('/dbQuery', app.controller.home.dbQuery);
    app.get('/insert', app.controller.home.insert);
    app.get('/update', app.controller.home.update);
    app.get('/createJwtToken', app.controller.home.createJwtToken);
    app.get('/verifyJwtToken', app.controller.home.verifyJwtToken);
    app.get('/verifyJwtTokenHeader', app.controller.home.verifyJwtTokenHeader);
    app.get('/callWebService', app.controller.home.callWebService);
}
