<html>
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css"/>
    <link rel="stylesheet" href="/public/css/news2.css"/>
</head>
<body>
<div class="news-view view">
    <h1></h1>
    {% for item in list %}
    <div class="item">
        <a href="{{ url + '/'+ item.id}} ">{{ item.title }} {{ helper.relativeTime(3) }}</a>
    </div>
    {% endfor %}
</div>
</body>
</html>