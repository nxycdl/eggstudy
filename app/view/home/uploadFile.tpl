<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form method="POST" action="/uploadFile?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
    title: <input name="title" />
    file: <input name="file" type="file" multiple/>
    <button type="submit">Upload</button>
</form>
</body>
</html>