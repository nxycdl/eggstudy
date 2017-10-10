'use strict';
const webservice = require('../extend/function/WebService');
module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            // console.log(app.nunjucks);
            console.log(this.ctx.crfs);
            console.log(this.ctx.helper.relativeTime(2));
            console.log(this.ctx.helper.moment(new Date()).format('yyyymmdd'));
            console.log(this.ctx.helper.formatUser({username: 'dl', sex: '1'}));
            yield this.ctx.render('home/home.tpl', []);

        }

        * home() {
            const ret = 'Npm run dev 使用的是local,另外配置文件是一个函数,需要有return,当然也有对象的;';
            this.ctx.body = ret;
        }

        * list() {
            const dataList = {
                list: [
                    {id: 1, title: 'this is news 1', url: '/news/1'},
                    {id: 2, title: 'this is news 2', url: '/news/2'}
                ]
            };
            yield this.ctx.render('news/list.tpl', dataList);
        }

        async postForm() {
            const user = {
                username: 'myusername',
                name: 'truename',
                age: 35,
                fam: {
                    sex: 1,
                    name: 2
                },
                list: [{qq: '1', dd: '2'}, {qq: '2', dd: '3'}]
            }
            await this.ctx.render('home/postForm.tpl', user);
        }

        async postFormSub() {
            const params = this.ctx.request.body;
            console.log(params);
            this.ctx.body = {success: true};
        }

        async dbTestTrans() {

            const conn = await app.mysql.beginTransaction(); // 初始化事务
            try {
                const ret = await this.ctx.service.dbService.findAll(conn);
                console.log(ret);
                this.ctx.body = ret;
            } catch (err) {
                await conn.rollback(); // 一定记得捕获异常后回滚事务！！
                throw err;
            }
        }

        async dbQuery() {
            this.ctx.body = await this.ctx.service.dbService.find(2);
        }

        async insert() {

            const ret = await this.ctx.service.dbService.insert('testtab', {name: 'namex'});
            this.ctx.body = ret;
        }

        async update() {
            console.log('xxxxx');
            const row = {
                id: 2,
                name: 'name222',
                bance: 12,
                rq: this.app.mysql.literals.now
            }
            this.ctx.body = await this.ctx.service.dbService.update('testtab', row);
        }

        async createJwtToken() {
            const expires = this.ctx.helper.moment().add('days', 7).valueOf();
            // const expires = 50;
            const token = app.jwt.sign({foo: 'bar'}, app.config.jwt.secret, {expiresIn: expires});
            this.ctx.body = token;
        }

        async verifyJwtToken() {
            const createRule = {
                accesstoken: {type: 'string', max: 255, require: true},
            }
            const errors = this.ctx.helper.validate(this.ctx, createRule, this.ctx.query);
            if (errors) return;
            const token = this.ctx.query.accesstoken;
            let decoded = '';
            try {
                console.log(token, app.config.jwt.secret);
                decoded = app.jwt.verify(token, app.config.jwt.secret);
            } catch (err) {
                console.log(err.message);
                this.ctx.helper.resetCtx(this.ctx, 401, err.message);
                return;
            }
            console.log('decode', decoded);
            this.ctx.body = decoded;
        }

        async verifyJwtTokenHeader() {
            const token = this.ctx.request.header.authorization;
            let decoded = '';
            try {
                console.log(token, app.config.jwt.secret);
                decoded = app.jwt.verify(token || '', app.config.jwt.secret);
            } catch (err) {
                console.log(err.message);
                this.ctx.helper.resetCtx(this.ctx, 401, err.message);
                return;
            }
            console.log('decode', decoded);
            this.ctx.body = decoded
        }

        async callWebService() {
            console.log('callWebService');
            let ret = {};
            let error = '';
            const url = 'http://10.150.4.101:7001/RemoteFacedeBean/RemoteFacedeBeanService?WSDL';
            const indata = '<?xml version="1.0" encoding="GBK"?><DATA><HEAD><VER>01.01</VER><APP>F1</APP><WorkDate>20170930</WorkDate><Reserve></Reserve><ErrCode>0</ErrCode><ErrDetail></ErrDetail></HEAD><MSG><HEAD><YLJGDM>00020002</YLJGDM><YYLSH>020000183486</YYLSH><YBLSH>20160824112549807315</YBLSH><FPHM>0</FPHM><SHBZH>1008616199</SHBZH><JSRQ>20170930023055</JSRQ><ZYTS>12</ZYTS><CYYY></CYYY><ZTJSBZ>0</ZTJSBZ><ZHZFBZ>0</ZHZFBZ><ZYHM>0000183486</ZYHM><CZYXM>ADMIN</CZYXM><CZRQ>20170930023055</CZRQ></HEAD></MSG></DATA>';
            const args = {arg0: '00000001', arg1: 'F1', arg2: '127.0.0.1', arg3: indata};

            try {
                ret = await webservice.callWebService(url, args);
            } catch (err) {
                console.log('发了错误', err)
                error = err;
            }
            if (error) {
                this.ctx.body = error.message;
                return;
            }
            ret = ret.return;
            var options = {
                object: false,
                reversible: false,
                coerce: false,
                sanitize: true,
                trim: true,
                arrayNotation: false,
                alternateTextNode: false
            };
            //ret = this.ctx.helper.parser.toJson(ret, options);
            this.ctx.body = ret;
        }
    }
    return HomeController;
};

