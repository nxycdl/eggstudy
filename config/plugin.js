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
    },
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    redis: {
        enable: false,
        package: 'egg-redis',
    }
}

