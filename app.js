module.exports = app => {
    app.beforeStart(function*() {
        // 应用会等待这个函数执行完成才启动
        setTimeout(() => {
            console.log('应用会等待这个函数执行完成才启动');
        }, 100)

        // 保证应用启动监听端口前数据已经准备好了
        // 后续数据的更新由定时任务自动触发
        console.log('手工执行定时任务');
        yield app.runSchedule('scheduletwo');

        // 如果启用了redis;
        if (app.config.redis.app) {
            const subscribe = yield app.redis.get('sub').subscribe('news', 'music');
            console.log('subscribe redis \t' + subscribe);

            app.redis.get('sub').on('message', function (channel, message) {
                if (channel === 'news') {
                    console.log('news channel:' + message)
                } else if (channel === 'music') {
                    console.log('music channel:' + message)
                }
            });
        }

        setTimeout(() => {
            if (app.config.redis.app) {
                app.redis.get('red').set('foo', 'foo');
            }
        }, 1000)
    });
    app.ready(() => {
        console.log('ready');
    });
};

