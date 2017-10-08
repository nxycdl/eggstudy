/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = app=>{
    //路由方式1 ,指定controller.method;
    app.get('/', 'home.index');
    //路由方式2,app.controller.name.method;
    app.get('/index', app.controller.home.index);

    app.get('/postForm', app.controller.home.postForm);

    app.post('/postFormSub', app.controller.home.postFormSub);
}