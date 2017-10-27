/**
 * Created by dl on 2017-10-26.
 */
'use strict';

/**
 *
 * @api {get} / 交易返回串定义
 * @apiName DefinedDocApiResult
 * @apiGroup API
 * @apiDescription 对交易返回串的说明,后续文档只对data进行说明，不在对错误，和返回值等说明
 *
 * @apiParam {String} success 判断http.status 是否等于200 并且返回值code ='1'
 *
 * @apiSuccess {String} code 返回结果 1 成功 其他代表HTTPstatus状态，都是失败;
 * @apiSuccess {String} err  错误消息
 * @apiSuccess {Object} data 返回结果
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       code:1; //代表成功;
 *       err:'',
 *       data:{id:'123',username:'张三',sex:'男'} //data里面存放返回结果
*     }
 *
 * @apiError error httpstatus<>200的都是异常错误，直接获取异常;
 *
 * @apiErrorExample Error-200
 * HTTP/1.1 200 OK
 *     {
 *       code:0; //代表失败;
 *       err:'错误消息',
 *       data:{}
*     }
 * @apiErrorExample Error-Response
 *     HTTP/1.1 422
 *     username:require;
 *
 * @apiErrorExample Error-Response
 *     HTTP/1.1 422
 *     用户名不能为空;
 *
 */
function main () {
    return '';
}

main();
