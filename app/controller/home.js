'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            // console.log(app.nunjucks);
            console.log(this.ctx.crfs);
            console.log(this.ctx.helper.relativeTime(2));
            console.log(this.ctx.helper.moment(new Date()).format('yyyymmdd'));
            console.log(this.ctx.helper.formatUser({username: 'dl', sex: '1'}));
            yield this.ctx.render('home/home.tpl', []);

        }

        * home() {
            const ret = 'Npm run dev 使用的是local,另外配置文件是一个函数,需要有return,当然也有对象的;';
            this.ctx.body = ret;
        }

        * list() {
            const dataList = {
                list: [
                    {id: 1, title: 'this is news 1', url: '/news/1'},
                    {id: 2, title: 'this is news 2', url: '/news/2'}
                ]
            };
            yield this.ctx.render('news/list.tpl', dataList);
        }

        async postForm() {
            const user = {
                username: 'myusername',
                name: 'truename',
                age: 35,
                fam: {
                    sex: 1,
                    name: 2
                },
                list: [{qq: '1', dd: '2'}, {qq: '2', dd: '3'}]
            }
            await this.ctx.render('home/postForm.tpl', user);
        }

        async postFormSub() {
            const params = this.ctx.request.body;
            console.log(params);
            this.ctx.body = {success: true};
        }

        async dbTestTrans() {

            const conn = await app.mysql.beginTransaction(); // 初始化事务
            try {
                const ret = await this.ctx.service.dbService.findAll(conn);
                console.log(ret);
                this.ctx.body = ret;
            } catch (err) {
                await conn.rollback(); // 一定记得捕获异常后回滚事务！！
                throw err;
            }
        }

        async dbQuery() {
            this.ctx.body = await this.ctx.service.dbService.find(2);
        }

        async insert() {

            const ret = await this.ctx.service.dbService.insert('testtab', {name: 'namex'});
            this.ctx.body = ret;
        }

        async update() {
            console.log('xxxxx');
            const row = {
                id: 2,
                name: 'name222',
                bance: 12,
                rq: this.app.mysql.literals.now
            }
            this.ctx.body = await this.ctx.service.dbService.update('testtab', row);
        }
    }
    return HomeController;
};

