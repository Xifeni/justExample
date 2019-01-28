<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<html>
<head>
    <title>Страница авторизации</title>
</head>
<body>
<h2>Страница авторизации</h2>
<form action="login" method="post">
    <p><b>Логин:</b><br>
        <input type="text" name="login" size="30"></p>
    <p><b>Пароль:</b><br>
        <input type="password" name="password" size="30"></p>
    <p><input type="submit" value="ОK"/>
</form>
</body>
</html>