'use strict'
/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = app => {
// 调用Service的例子;使用Ansy 写法调用Cnode后台;
    app.get('/extends/index', app.controller.extendstep.index);

    app.get('/getDemo/getone', app.controller.getDemo.getone);

    app.get('/getDemo/gettwo/:id', app.controller.getDemo.gettwo);
    app.get('/getDemo/gettwo/:id/:name', app.controller.getDemo.gettwo);
    app.get('/getDemo/gettwo/:id/:name/:sex', app.controller.getDemo.gettwo);
    // POST方法;
    app.post('/postDemo/postone', app.controller.postDemo.postone);
}