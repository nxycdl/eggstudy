/**
 * Created by dl on 2017-10-20.
 */
'use strict';
module.exports = function (root) {
    return {
        rjson: require(root + '/function/returnout'),
        sign: require(root + '/function/sign'),
        validateID: require(root + '/function/validateID')
    }
}
