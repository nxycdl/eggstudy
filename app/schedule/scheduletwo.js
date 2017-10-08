/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    schedule: {
        interval: '10s', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
    async task(ctx) {
        console.log('start task2');
        const res = await ctx.curl('http://localhost:7001/getDemo/getone?id=1&&name=dl');
        console.log(ctx.helper.moment().format('YYYY MM DD HH:mm:ss'), res.data.toString());
        ctx.app.cache = {}
    },
};