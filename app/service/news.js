/**
 * Created by Administrator on 2017-10-07.
 */
module.exports = app => {
    class NewsService extends app.Service {
        *list(page = 1, tab = good, limit = 20) {
            const {serverUrl, pageSize} = this.app.config.news;

            const {data: ret} = yield this.ctx.curl(`${serverUrl}/topics`, {
                data: {
                    page: page,
                    tab: tab,
                    limit: limit
                },
                dataType: 'json',
            });
            return ret;
        }


        async list3(page = 1, tab = good, limit = 20) {
            const {serverUrl, pageSize} = this.app.config.news;

            const {data: ret} = await this.ctx.curl(`${serverUrl}/topics`, {
                data: {
                    page: page,
                    tab: tab,
                    limit: limit
                },
                dataType: 'json',
            });
            return ret;

        }

    }
    return NewsService;
}