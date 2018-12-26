package controller;

import dao.AuthenticationDao;
import dao.AuthenticationDaoImpl;
import dao.UserDao;
import dao.UserDaoImpl;

import java.sql.SQLException;

public class MainController {

    private AuthenticationDao authDao = new AuthenticationDaoImpl();
    private UserDao userDao = new UserDaoImpl();

    public boolean isCorrectRequest(String login, String password) throws SQLException {
        return authDao.isValidUser(login, password);
    }

    public boolean isCorrectRequest(String sessionId) throws SQLException {
        return authDao.isAuthenticatedUser(sessionId);
    }

    public void registerUserSession(String login, String sessionId) throws SQLException {
        authDao.registerSessionUser(login, sessionId);
    }
}
