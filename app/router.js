'use strict';
module.exports = app => {
    require('./router/news')(app);
    require('./router/home')(app);
    require('./router/demo')(app);
    require('./router/userrouter')(app);
    require('./router/topicrouter')(app);
};
