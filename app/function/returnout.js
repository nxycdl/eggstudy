/**
 * Created by dl on 2017-07-31.
 */
'use strict';
module.exports = {
    out: function (code = 0, err = '', data = '') {
        return {
            code, err, data
        };
    }
}
