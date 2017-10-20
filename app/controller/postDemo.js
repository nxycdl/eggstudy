/**
 * Created by Administrator on 2017-10-08.
 */
module.exports = app => {
    return class postDemoController extends app.Controller {
        async postone () {
            const params = this.ctx.request.body;
            console.log(params);
            this.ctx.body = 'postone:' + JSON.stringify(params);
        }
    }
}
