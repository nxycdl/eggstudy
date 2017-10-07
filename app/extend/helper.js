/**
 * Created by Administrator on 2017-10-07.
 */
const moment = require('moment');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
exports.moment = moment;


