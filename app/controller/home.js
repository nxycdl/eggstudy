'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            // console.log(app.nunjucks);
            console.log(this.ctx.helper.relativeTime(2));
            console.log(this.ctx.helper.moment(new Date()).format('yyyymmdd'));
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

    }
    return HomeController;
};
