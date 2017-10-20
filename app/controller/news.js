/**
 * Created by Administrator on 2017-10-07.
 */
module.exports = app => {
    class NewsController extends app.Controller {
        * list () {
            const ctx = this.ctx;
            const page = ctx.query.page || 1;
            const ret = yield ctx.service.news.list(page, 'good', 20);
            const newsList = (ret.success ? ret.data : []);
            yield ctx.render('news/list.tpl', { list: newsList, url: app.config.news.serverTopic });
        }

        async list3 () {
            const ctx = this.ctx;
            const page = ctx.query.page || 1;
            const ret = await ctx.service.news.list3(page, 'good', 20);
            const newsList = (ret.success ? ret.data : []);
            await ctx.render('news/list.tpl', { list: newsList, url: app.config.news.serverTopic });
        }
    }
    return NewsController;
}
