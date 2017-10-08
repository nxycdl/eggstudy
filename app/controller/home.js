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
            let ret = 'Npm run dev 使用的是local,另外配置文件是一个函数,需要有return,当然也有对象的;';
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
            var params = this.ctx.request.body;
            console.log(params);
            this.ctx.body = {success: true};
        }
    }
    return HomeController;
};
