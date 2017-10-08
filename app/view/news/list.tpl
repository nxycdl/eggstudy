<html>
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css"/>
</head>
<body>
<div class="news-view view">
    {% for item in list %}
    <div class="item">
        <a href="{{ url + '/'+ item.id}} ">{{ item.title }} {{ helper.relativeTime(3) }}</a>
    </div>
    {% endfor %}
</div>
</body>
</html>