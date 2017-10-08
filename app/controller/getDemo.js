/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = app => {
    return class getDemoController extends app.Controller {
        async getone() {
            var params = this.ctx.query;
            this.ctx.body = `query params:` + JSON.stringify(params);
        }
        async gettwo() {
            var params = this.ctx.params;
            this.ctx.body = `restful:` + JSON.stringify(params);
        }

    }
}