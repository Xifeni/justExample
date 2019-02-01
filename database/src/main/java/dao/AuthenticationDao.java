package dao;

import java.sql.SQLException;

public interface AuthenticationDao {
    boolean isAuthenticatedUser(String sessionId) throws SQLException;
    boolean isValidUser(String password, String login) throws SQLException;

    void registerSessionUser(String login, String sessionId) throws SQLException;
    void clearSessions() throws SQLException;

    String getUserPermission(String login) throws SQLException;

    String getUsername(String id) throws SQLException;
}
