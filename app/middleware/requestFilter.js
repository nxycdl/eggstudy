/**
 * Created by dl on 2017-10-16.
 */
module.exports = app => {
    return function* requestFilter(next) {
        if (app.enable || true) {
            const start = new Date();
            yield next;
            const end = new Date();
            const time = end.getTime() - start.getTime();
            console.log(this.request.ip);
            this.app.getLogger('requestLogger').info(`\t${this.request.ip}\t${this.request.method}\t${this.path}\t${this.status}\t${time}ms\t`);
        }
    }
}