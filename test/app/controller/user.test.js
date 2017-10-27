/**
 * Created by dl on 2017-10-20.
 */
'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const testUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJuYW1lIjoiMDAwMCIsIm5hbWUiOiIwMDAw5aeT5ZCNIiwiaWF0IjoxNTA5MDc2NTcwfQ.sU5RX5MHKZEOA13eOVaCEVLwE0MGdo9Pxqq2xhPU2H4';


describe('test/app/controller/user.test.js', () => {

    it('should GET /user/query', () => {
        return app.httpRequest()
            .get('/user/query')
            .expect('123')
            .expect(200);
    });

    it('should GET /user/isExistUserName?username=111 expect true ', () => {
        return app.httpRequest()
            .get('/user/isExistUserName?username=111')
            .expect(200)
            .then(response => {
                assert(response.body.code === 1);
                assert(response.body.data.isExists === true);
            });
    });

    it('user login username ', () => {
        return app.httpRequest()
            .post('/user/login')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ username: 'username', password: '123456' })
            .expect(200)
            .then(response => {
                assert(response.body.code === 0)
            });

    });

    it('user login 0000 ', () => {
        return app.httpRequest()
            .post('/user/login')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ username: '0000', password: '0000' })
            .expect(200)
            .then(response => {
                assert(response.body.code === 1)
                const token = response.body.data.token;
                console.log('登陆成功:' + token);
            });
    });

    it('user logout', function* () {
        const logoutdata = yield app.httpRequest()
            .post('/user/logout')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ token: testUserToken });
        assert(logoutdata.body.code === 1);
        console.log('注销成功:');
        console.log(logoutdata.body);
    });

    it('user login changepwd', function* () {
        const ctx = app.mockContext();
        const user = yield ctx.service.userService.find(32);
        assert(user);
        assert(user.username === '1111');
        const { username, password } = user;
        // 登陆;
        const data = yield app.httpRequest()
            .post('/user/login')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ username, password })
            .expect(200);
        assert(data.body.code === 1);
        const changepwd = yield app.httpRequest()
            .post('/user/changepwd')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ token: data.body.data.token, oldpwd: password, newpwd: '9999' });
        assert(changepwd.body.code === 1);
        console.log('修改密码成功,并且重新生成了token');
    });


});
