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
        <li><a href="/dbTestTrans">数据库测试 -->带事物的写法</a></li>
        <li><a href="/dbQuery">数据库测试 -->查询</a></li>
        <li><a href="/insert">数据库测试 -->插入</a></li>
        <li><a href="/update">数据库测试 -->更新</a></li>
        <li><a href="#">egg.js不建议直接写SQL,但是支持db.query()</a></li>
    </ul>

</div>
</body>
</html>