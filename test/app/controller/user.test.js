/**
 * Created by dl on 2017-10-20.
 */
'use strict';

const {app, assert} = require('egg-mock/bootstrap');

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
            .expect('true')
            .expect(200);
    });

    it('user login username ', () => {
        return app.httpRequest()
            .post('/user/login')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({username: 'username', password: '123456'})
            .expect(200)
            .then(response => {
                assert(response.body.code === 0)
            });

    });


    it('user login 0000 ', () => {
        return app.httpRequest()
            .post('/user/login')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({username: '0000', password: '0000'})
            .expect(200)
            .then(response => {
                assert(response.body.code === 1)
                /*const token = response.body.data.token;*/
            });

    });
});
