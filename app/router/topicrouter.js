/**
 * Created by dl on 2017-10-20.
 */
'use strict'
module.exports = app => {
    app.post('/topic/add', app.controller.topic.add);
    app.post('/topic/reply', app.controller.topic.reply);
}
