/**
 * Created by Administrator on 2017-10-08.
 * 框架会把 app/extend/context.js 中定义的对象与 Koa Context 的 prototype 对象进行合并，
 * 在处理请求时会基于扩展后的 prototype 生成 ctx 对象。

 */
module.exports = {
    get isIOS () {
        const iosReg = /iphone|ipad|ipod/i;
        return iosReg.test(this.get('user-agent'));
    },
    get currentPath () {
        return 'd:\\';
    }
}
