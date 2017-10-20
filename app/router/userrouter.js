/**
 * Created by dl on 2017-10-20.
 */
module.exports = app => {
    app.get('/user/query', app.controller.user.query);
    app.get('/user/isExistUserName', app.controller.user.isExistUserName);
    app.get('/user/getUserinfoByToken', app.controller.user.getUserinfoByToken);
    app.post('/user/login', app.controller.user.login);
    app.post('/user/logout', app.controller.user.logout);
}
