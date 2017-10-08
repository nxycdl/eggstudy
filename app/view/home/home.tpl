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
    </ul>

</div>
</body>
</html>