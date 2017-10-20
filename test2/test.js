const xm2js = require('../app/extend/function/xm2js');
const moment = require('moment');

const xml = '<root>Hello xml2js!</root>';
xm2js.parseString(xml).then(data => {
    console.log(xml);
})

const expires = moment().add('days', 1).valueOf();

console.log(expires);
