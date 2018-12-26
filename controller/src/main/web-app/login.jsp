<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Страница авторизации</title>
</head>
<body>
<h2>Страница авторизации</h2>
<form action="main.jsp" method="post">
    <p><b>Логин:</b><br>
        <input type="text" name="login" size="30"></p>
    <p><b>Пароль:</b><br>
        <input type="password" name="password" size="30"></p>
    <p><input type="submit" value="ОK"/>
</form>
</body>
</html>