'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1507377681959_2214';
    // config.keys = 'egg_1507377681959_2214';

    // add your config here
    config.middleware = [];

    // add view config
    exports.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    exports.news = {
        pageSize: 5,
        serverUrl: 'https://cnodejs.org/api/v1',
        serverTopic: 'http://cnodejs.org/topic'
    };

    exports.security = {
        csrf: {
            // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
            ignore: '/postDemo',
            queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
        },
    };
    //是否启用CSRF;
    /*exports.security = {
     csrf: false
     };*/

    return config;
};
