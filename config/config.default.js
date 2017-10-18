'use strict';
const path = require('path');
module.exports = appInfo => {
    const config = exports = {

        // use for cookie sign key, should change to your own and keep security
        keys: appInfo.name + '_1507377681959_2214',
        // config.keys : 'egg_1507377681959_2214',

        // add your config here
        middleware: ['requestFilter'],

        requestFilter: {
            enable: true
        },

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
        },
        jwt: {
            secret: 'jo0NT105',
            enable: false
        },
        redis: {
            // 这里使用2个redis的客户端;
            clients: {
                sub: {
                    port: 6380, // Redis port

                    db: 0,
                },
                red: {
                    port: 6380, // Redis port
                    
                    db: 0,
                }
            }
        },
        customLogger: {
            requestLogger: {
                file: path.join(appInfo.root, `logs/${appInfo.name}/requestLogger.log`),
            },
        }
    }
    return config;
}
