<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PostForm Example</title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<div>
    <center>
        <form action="http://localhost:7001/postFormSub" method="post">
            <input type="hidden" name="_csrf" value="{{ ctx.csrf }}">
            <p>用户名：<input type="text" name="name" value="{{username}}"/></p>
            <p>密码：<input type="password" name="pwd"/></p>
            <label>这里有一个隐藏的_csrf,在PostForm里面可以有，也可以没有。如果没有框架会自动默认post一个上去;</label>
            <input type="submit" value="登录">
        </form>
    </center>
</div>
</body>
<script>
    var list = {{list|dump|safe}};
    console.log(list);
</script>
</html>