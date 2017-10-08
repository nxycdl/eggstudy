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
    });
};