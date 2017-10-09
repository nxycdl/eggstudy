'use strict';

// had enabled by egg
module.exports = {
    static: true,
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    },
    mysql: {
        enable: true,
        package: 'egg-mysql'
    }
}

