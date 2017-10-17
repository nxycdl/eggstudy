var xm2js = require('../../../app/extend/function/xm2js');

var xml = "<root>Hello xml2js!</root>";
xm2js.parseString(xml).then((data) => {
    console.log(xml);
})