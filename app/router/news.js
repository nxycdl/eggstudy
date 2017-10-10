'use strict'
module.exports = app => {
    // 工程目录见https://eggjs.org/zh-cn/basics/structure.html;
    app.get('/news/list', app.controller.home.list);
    // 调用Service的例子;使用yield 写法调用Cnode后台;
    app.get('/news/list2', app.controller.news.list);
}
