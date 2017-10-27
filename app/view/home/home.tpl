<html>
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css"/>
</head>
<body>
<div class="news-view view">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/index">index</a></li>
        <li><a href="/news/list">render一个列表</a></li>
        <li><a href="/news/list2">render一个列表 yield方式</a></li>
        <li><a href="/news/list3">render一个列表 async方式</a></li>
        <li><a href="/extends/index">extend扩展</a></li>
        <li><a href="/getDemo/getone?id=1&&name=dl">get请求?id=1&&name=2,通过this.ctx.query获取参数</a></li>
        <li><a href="/getDemo/gettwo/1/2/3">get请求restful方式/1/2/3/4/5通过this.ctx.params获取参数</a></li>
        <li><a href="/postForm">PostForm</a></li>
        <li><a href="/postForm2">PostForm2</a></li>
        <li><a href="/dbTestTrans">数据库测试 -->带事物的写法</a></li>
        <li><a href="/dbQuery">数据库测试 -->查询</a></li>
        <li><a href="/insert">数据库测试 -->插入</a></li>
        <li><a href="/update">数据库测试 -->更新</a></li>
        <li><a href="#">egg.js不建议直接写SQL,但是支持db.query()</a></li>
        <li><a href="/createJwtToken">创建一个JWTtoken</a></li>
        <li><a href="/verifyJwtToken?accesstoken=1">验证一个JWTtoken</a></li>
        <li><a href="/verifyJwtTokenHeader?accesstoken=1">验证一个JWTtoken通过HTTP Header</a></li>
        <li><a href="/#">注意在JWT里面使用validate插件的使用方法</a></li>
        <li><a href="/#">Http返回的判断方法：HTTP.STATUS <> 200 弹出BODY</a></li>
        <li><a href="/callWebService">WebService调用</a></li>
        <li><a href="/redisTest">redisTestp普通的GET PUT</a></li>
        <li><a href="/redisPublish">redis发布订阅模式</a></li>
        <li><a href="/uploadFilePage">文件上传</a></li>
    </ul>

</div>
</body>
</html>