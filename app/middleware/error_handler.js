module.exports = () => {
    return function* errorHandler(next) {
        try {
            yield next;
        } catch (err) {
            // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
            // 框架会统一监听，并打印对应的错误日志
            this.app.emit('error', err, this);
            // 自定义错误时异常返回的格式
            this.body = global._.rjson.out(-1, this.app.config.env === 'prod' ? 'Internal Server Error' : err.message);
        }
    };
}
