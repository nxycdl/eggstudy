/**
 * Created by dl on 2017-10-27.
 */
'use strict';
module.exports = app => {
    return class topicController extends app.Controller {
        /**
         * @api {post} /topic/add add
         * @apiName add
         * @apiGroup Topic
         * @apiDescription 发表话题
         *
         * @apiParam {String} token 用户token;
         * @apiParam {String} title 标题;
         * @apiParam {String} content 话题内容;
         *
         * @apiSuccess {String} idkey pk of topic;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       code:1,
         *       err:'',
         *       data:{
         *          idkey:idkey
         *       }
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 200
         *     {
         *       code:404,
         *       err:'用户不存在'
         *     }
         */
        async add () {
            console.log('当前环境:', this.config.env);
            const createRule = {
                token: { type: 'string', max: 255, require: true },
                title: { type: 'string', max: 255, require: true },
                content: { type: 'string', require: true },
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.request.body);
            if (errors) return;
            const { token, title, content } = this.ctx.request.body;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            const user = await this.ctx.service.userService.find(decode.id);
            if (_.isNull(user)) {
                throw Error('用户不存在');
            }
            const idkey = global._.string.guid();
            const conn = await app.mysql.beginTransaction(); // 初始化事务
            try {
                const topicrow = {
                    idkey,
                    userid: user.id,
                    title,
                    ip: this.ctx.request.ip,
                    createtime: this.app.mysql.literals.now
                }

                const data = await conn.insert('topic', topicrow);// 第一步操作

                const topiccontentrow = {
                    topicid: data.insertId,
                    content
                }
                await conn.insert('topicscontent', topiccontentrow);// 第二步操作
                await conn.commit(); // 提交事务
            } catch (err) {
                await conn.rollback(); // 一定记得捕获异常后回滚事务！！
                throw err;
            }
            this.ctx.body = global._.rjson.out(1, '', { idkey });
        }

        /**
         * @api {post} /topic/add add
         * @apiName add
         * @apiGroup Topic
         * @apiDescription 修改话题
         *
         * @apiParam {String} token 用户token;
         * @apiParam {String} idkey 标题;
         * @apiParam {String} content 话题内容;
         *
         * @apiSuccess {String} idkey pk of topic;
         *
         * @apiSuccessExample Success-Response
         *     HTTP/1.1 200 OK
         *     {
         *       code:1,
         *       err:'',
         *       data:{
         *          idkey:idkey
         *       }
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response
         *     HTTP/1.1 200
         *     {
         *       code:404,
         *       err:'用户不存在'
         *     }
         */
        async update () {

        }

        async reply() {

        }
    }
}
