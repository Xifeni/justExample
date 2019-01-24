package controller;

import dao.AuthenticationDao;
import dao.AuthenticationDaoImpl;
import dao.UserDao;
import dao.UserDaoImpl;
import model.User;

import java.sql.SQLException;
import java.util.List;

public class DataController {

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

    public void clearSessions() throws SQLException {
        authDao.clearSessions();
    }

    public String getPermissions(String login) throws SQLException {
        return authDao.getUserPermission(login);
    }

    public List<User> getUsersList(){
        return userDao.getUsers();
    }
}