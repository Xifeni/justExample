package controller;

import dao.AuthenticationDao;
import dao.AuthenticationDaoImpl;

import java.sql.SQLException;

public class AuthenticationDataController {

    private AuthenticationDao authDao = new AuthenticationDaoImpl();

    public boolean isCorrectRequest(String login, String password) throws SQLException {
        return authDao.isValidUser(login, password);
    }

    public boolean isCorrectRequest(String sessionId) throws SQLException {
        return authDao.isAuthenticatedUser(sessionId);
    }

    public void registerUserSession(String login, String sessionId) throws SQLException {
        authDao.registerSessionUser(login, sessionId);
    }

    public String getPermissions(String sessionId) throws SQLException {
        return authDao.getUserPermission(sessionId);
    }

    public String getUsername(String id) throws SQLException {
        return authDao.getUsername(id);
    }

    public void logout(String sessionId) throws SQLException {
        authDao.clearSession(sessionId);
    }
}
