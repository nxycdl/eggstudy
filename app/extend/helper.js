'use strict';

const moment = require('moment');
const xml2js = require('./function/xm2js');

module.exports = {
    relativeTime (time) {
        return moment(new Date(time * 1000)).fromNow();
    },
    moment,
    formatUser (user) {
        return user.username
    },
    validate (ctx, createRule, body = ctx.request.body) {
        let message = '';
        try {
            ctx.validate(createRule, body);
        } catch (err) {
            console.log(err);
            message = `${err.errors[0].field}:${err.errors[0].message}`
            ctx.body = message;
            ctx.status = 422;
            // ctx.throw(422,message);
        }
        return message;
    },
    resetCtx (ctx, status, body) {
        ctx.body = body;
        ctx.status = status;
    },
    xml2js
}

