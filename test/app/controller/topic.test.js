/**
 * Created by dl on 2017-10-27.
 */
'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const testUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJuYW1lIjoiMDAwMCIsIm5hbWUiOiIwMDAw5aeT5ZCNIiwiaWF0IjoxNTA5MDc2NTcwfQ.sU5RX5MHKZEOA13eOVaCEVLwE0MGdo9Pxqq2xhPU2H4';


describe('test/app/controller/user.test.js', () => {
    it('should topic /add', () => {
        return app.httpRequest()
            .post('/topic/add')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send({ token: testUserToken, title: 'test', content: '<div><h1>aaa</h1><h2>bbb</h2><h3>ccc</h3></div>' })
            .expect(200)
            .then(response => {
                assert(response.body.code === 1);
            });
    });
});
