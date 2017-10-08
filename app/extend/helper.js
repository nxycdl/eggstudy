/**
 * Created by Administrator on 2017-10-07.
 */
const moment = require('moment');

module.exports = {
    relativeTime(time){
        return moment(new Date(time * 1000)).fromNow();
    },
    moment: moment,
    formatUser(user){
        return user.username
    }
}




