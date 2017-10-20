/**
 * Created by dl on 2017-10-20.
 */
'use strict';
module.exports = app => {
    return class userController extends app.Controller {
        async query() {
            const {token} = this.ctx.query;
            console.log(token);
            this.ctx.body = '123';
        }

        async isExistUserName() {
            const createRule = {
                username: {type: 'string', max: 255, require: true},
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.query);
            if (errors) return;
            const {username} = this.ctx.query;
            let ret = await this.ctx.service.userService.isExistUserName(username);
            ret = (ret.length === 0 ? false : true);
            this.ctx.body = ret;

        }

        async getUserinfoByToken() {
            const createRule = {
                token: {type: 'string', max: 255, require: true},
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.query);
            if (errors) return;
            const decode = app.jwt.verify(this.ctx.query.token, app.config.jwt.secret);
            const user = await this.ctx.service.userService.find(decode.id);
            if (_.isNull(user)) {
                this.ctx.body = global._.rjson.out(0, '用户不存在');
                return;
            }
            const userinfo = {
                username: user.id,
                name: user.name,
                gender: user.gender,
                phone: user.phone,
            }
            this.ctx.body = global._.rjson.out(1, '', userinfo);
        }

        async login() {
            const createRule = {
                username: {type: 'string', max: 255, require: true},
                password: {type: 'string', max: 255, require: true},
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.request.body);
            if (errors) return;
            const {username, password} = this.ctx.request.body;
            const user = await this.ctx.service.userService.findByUserName(username);

            if (user.length === 0) {
                this.ctx.body = global._.rjson.out(0, '用户不存在');
                return;
            }

            if (user[0].password !== password) {
                this.ctx.body = global._.rjson.out(0, '密码错误');
                return;
            }
            // 修改最后登录时间;
            // 返回一个jwt;
            const expires = 7 * 24 * 60 * 60 * 1000;
            const userinfo = {id: user[0].id, username: user[0].username, name: user[0].name}
            const token = app.jwt.sign(userinfo, app.config.jwt.secret, {expiresIn: expires});

            const row = {
                id: userinfo.id,
                safe_key_value: token,
                login_date: this.app.mysql.literals.now,
                login_ip: this.ctx.request.ip
            };
            if (await this.ctx.service.userService.update(row)) {
                this.ctx.body = global._.rjson.out(1, '', {token});
            } else {
                this.ctx.body = global._.rjson.out(-1, '发生了错误');
            }


        }


        async logout() {

        }

        async changepwd() {

        }

    }
}
