/**
 * Created by dl on 2017-10-20.
 */
'use strict';
module.exports = app => {
    return class userController extends app.Controller {
        async query () {
            const { token } = this.ctx.query;
            console.log(token);
            this.ctx.body = '123';
        }

        /**
         * @api {get} /user/isExistUserName?username=:username isExistUserName
         * @apiName isExistUserName
         * @apiGroup User
         * @apiDescription 是否存在当前用户
         *
         * @apiParam {String} username 用户名;
         *
         * @apiSuccess {Boolean} isExists ture or false.
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       isExists:false;
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 422
         *     username:require;
         */
        async isExistUserName () {
            const createRule = {
                username: { type: 'string', max: 255, require: true },
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.query);
            if (errors) return;
            const { username } = this.ctx.query;
            let ret = await this.ctx.service.userService.isExistUserName(username);
            ret = (ret.length !== 0);
            this.ctx.body = global._.rjson.out(1, '', { isExists: ret });

        }

        /**
         * @api {get} /user/getUserinfoByToken?token=:token getUserinfoByToken
         * @apiName getUserinfoByToken
         * @apiGroup User
         * @apiDescription 通过token获取当前用户信息;
         *
         * @apiParam {String} token token
         *
         * @apiSuccess {String} username 用户名;
         * @apiSuccess {String} name 姓名;
         * @apiSuccess {String} gender 性别;
         * @apiSuccess {String} phone 电话;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       code:1,
         *       data:{
         *          username,name,gender,phone
         *
         *     }
         *
         * @apiError UserNotFound The token is wrong or token expire
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 200
         *     {
         *          code:0
         *          err:'用户不存在';
         *     }
         */
        async getUserinfoByToken () {
            const createRule = {
                token: { type: 'string', max: 255, require: true },
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

        async createJwt (id, username, name, expires = 7 * 24 * 60 * 60 * 1000) {
            const userinfo = { id, username, name }
            const token = app.jwt.sign(userinfo, app.config.jwt.secret, { expiresIn: expires });
            return token;
        }

        // 永久的token;
        async createJwtLong (id, username, name) {
            const userinfo = { id, username, name }
            const token = app.jwt.sign(userinfo, app.config.jwt.secret);
            return token;
        }

        /**
         * @api {post} /user/login login
         * @apiName login
         * @apiGroup User
         * @apiDescription 用户登陆操作
         *
         * @apiParam {String} username 用户名;
         * @apiParam {String} password 密码;
         *
         * @apiSuccess {String} token user token key;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       code:'1',
         *       err:'',
         *       data:{
         *          token:'abcdd';
         *       }
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 422 Not Found
         *     username:require;
         *     password:require;
         *  @apiErrorExample Error-Response
         *    HTTP/1.1 200
         *    {
         *      code:'0',
         *      err:'用户不存在'
         *    }
         */
        async login () {
            const createRule = {
                username: { type: 'string', max: 255, require: true },
                password: { type: 'string', max: 255, require: true },
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.request.body);
            if (errors) return;
            const { username, password } = this.ctx.request.body;

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
            // const expires = 7 * 24 * 60 * 60 * 1000;
            // const userinfo = {id: user[0].id, username: user[0].username, name: user[0].name}
            const token = await this.createJwt(user[0].id, user[0].username, user[0].name);

            const row = {
                id: user[0].id,
                safe_key_value: token,
                login_date: this.app.mysql.literals.now,
                login_ip: this.ctx.request.ip
            };
            if (await this.ctx.service.userService.update(row)) {
                this.ctx.body = global._.rjson.out(1, '', { token });
            } else {
                this.ctx.body = global._.rjson.out(-1, '发生了错误');
            }
        }

        /**
         * @api {post} /user/logout logout
         * @apiName logout
         * @apiGroup User
         * @apiDescription 用户退出
         *
         * @apiParam {String} token token;
         *
         * @apiSuccess {String} token user token key;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       code:'1',
         *       err:''
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 422 Not Found
         *     username:require;
         *     password:require;
         *  @apiErrorExample Error-Response
         *    HTTP/1.1 200
         *    {
         *      code:'0',
         *      err:'用户不存在'
         *    }
         */
        async logout () {
            const errors = this.ctx.helper.validate(this.ctx, {
                token: {
                    type: 'string',
                    max: 255,
                    require: true
                }
            }, this.ctx.request.body);
            if (errors) return;
            const { token } = this.ctx.request.body;
            let userinfo = {};
            try {
                userinfo = app.jwt.verify(token, app.config.jwt.secret);
            } catch (e) {
                this.ctx.body = global._.rjson.out(1, '');
                return;
            }
            const row = {
                id: userinfo.id,
                safe_key_value: ''
            };
            if (await this.ctx.service.userService.update(row)) {
                this.ctx.body = global._.rjson.out(1, '');
            } else {
                this.ctx.body = global._.rjson.out(-1, '发生了错误');
            }
        }

        /**
         * @api {post} /user/changepwd changepwd
         * @apiName changepwd
         * @apiGroup User
         * @apiDescription 修改密码，修改成功后会重新生成一个token,请使用这个新的token;
         *
         * @apiParam {String} token token
         * @apiParam {String} oldpwd 原始密码
         * @apiParam {String} newpwd 新密码
         * @apiSuccess {String} token 会重新生成一个token;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *      code:1,
         *      err:''
         *      data:{token:token}
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *

         *  @apiErrorExample Error-Response
         *    HTTP/1.1 200
         *    {
         *      code:'0',
         *      err:'用户不存在'
         *    }
         *  @apiErrorExample Error-Response
         *     HTTP/1.1 422 Not Found
         *     username:require;
         *     password:require;
         */
        async changepwd () {
            const createRule = {
                token: { type: 'string', max: 255, require: true },
                oldpwd: { type: 'string', max: 255, require: true },
                newpwd: { type: 'string', max: 255, require: true },
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.request.body);
            if (errors) return;
            const { token, oldpwd, newpwd } = this.ctx.request.body;
            let decode = {};
            decode = app.jwt.verify(token, app.config.jwt.secret);
            console.log(decode);
            const user = await this.ctx.service.userService.find(decode.id);
            console.log(_.isNull(user), _.isUndefined(user));
            if (_.isNull(user) || _.isUndefined(user)) {
                this.ctx.body = global._.rjson.out(0, '用户不存在');
                return;
            }
            if (user.password !== oldpwd) {
                this.ctx.body = global._.rjson.out(0, '原始密码错误');
                return;
            }
            const newToken = await this.createJwt(user.id, user.username, user.name);

            const row = {
                id: user.id,
                safe_key_value: newToken,
                password: newpwd,
                last_updated_date: this.app.mysql.literals.now,
            };
            if (await this.ctx.service.userService.update(row)) {
                this.ctx.body = global._.rjson.out(1, '', { token: newToken });
            } else {
                this.ctx.body = global._.rjson.out(-1, '发生了错误');
            }
        }

    }
}
