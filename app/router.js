'use strict';
module.exports = app => {
    require('./router/news')(app);
    require('./router/home')(app);
    require('./router/demo')(app);
};
