/**
 * Created by Administrator on 2017-10-07.
 */
'use strict';
module.exports = appInfo => {
    return {
        APPNAME: appInfo.name,
        APPKEY: '123456',
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: '127.0.0.1',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: 'root',
                // 数据库名
                database: 'tempdb',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
    }
}
