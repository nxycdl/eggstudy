'use strict';
module.exports = appInfo => {
    const config = exports = {

        // use for cookie sign key, should change to your own and keep security
        keys: appInfo.name + '_1507377681959_2214',
        // config.keys : 'egg_1507377681959_2214',

        // add your config here
        middleware: [],

        // add view config
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.tpl': 'nunjucks',
            },
        },

        news: {
            pageSize: 5,
            serverUrl: 'https://cnodejs.org/api/v1',
            serverTopic: 'http://cnodejs.org/topic'
        },

        security: {
            csrf: {
                // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
                ignore: '/postDemo',
                queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
                bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
            },
        },
        // 是否启用CSRF,
        /* exports.security : {
         csrf: false
         }, */
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: '120.26.109.153',
                // 端口号
                port: '3306',
                // 用户名
                user: 'btc',
                // 密码
                password: 'btc99999',
                // 数据库名
                database: 'btc',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        }
    }
    return config;
}
