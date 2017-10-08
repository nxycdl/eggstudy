'use strict';

module.exports = app => {
    return class ExtendstepController extends app.Controller {
        * index() {
            let ret = `使用this.ctx.isIOS来访问context: ${this.ctx.isIOS}
            ,另外要注意extend目录下的文件名不要写错了.
            ,当前路径:${this.ctx.currentPath}`;
            this.ctx.body =ret;
        }
    };
};
