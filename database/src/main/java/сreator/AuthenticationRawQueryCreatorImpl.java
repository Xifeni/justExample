package сreator;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AuthenticationRawQueryCreatorImpl implements AuthenticationRawQueryCreator {

    private static final String IS_AUTH_USER = "SELECT EXISTS (SELECT * FROM sessions WHERE id = (SELECT id FROM users where username = ? AND password = ?))";
    private static final String REGISTER_USER_SESSION = "UPDATE sessions SET CURRENT_SESSION = ? WHERE id = (select id from users where username = ?)";
    private static final String IS_REGISTERED_USER = "SELECT EXISTS (SELECT * FROM sessions WHERE CURRENT_SESSION = ?)";
    private static final String GET_PERMISSION_USER = "SELECT permissions FROM users WHERE id = (select id from sessions where current_session = ?)";
    private static final String CLEAR_SESSIONS = "UPDATE sessions SET CURRENT_SESSION = NULL WHERE CURRENT_SESSION = ?";
    private static final String GET_USERNAME = "select username from users where id = (SELECT id FROM sessions WHERE CURRENT_SESSION = ?)";


    @Override
    public PreparedStatement getAuthenticatedUserRawQuery(Connection connection, String username, String password) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(IS_AUTH_USER);
        statement.setString(1, username);
        statement.setString(2, password);
        return statement;
    }

    @Override
    public PreparedStatement getRegistrationRawQuery(Connection connection, String username, String sessionId) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(REGISTER_USER_SESSION);
        statement.setString(1, sessionId);
        statement.setString(2, username);
        return statement;
    }

    @Override
    public PreparedStatement getRegisteredUserRawQuery(Connection connection, String sessionId) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(IS_REGISTERED_USER);
        statement.setString(1, sessionId);
        return statement;
    }

    @Override
    public PreparedStatement getLegitRequestRawQuery(Connection connection, String username) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(GET_PERMISSION_USER);
        statement.setString(1, username);
        return statement;
    }

    @Override
    public PreparedStatement getClearSessionRawQuery(Connection connection, String sessionId) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(CLEAR_SESSIONS);
        statement.setString(1, sessionId);
        return statement;
    }

    @Override
    public PreparedStatement getRawUsername(Connection connection, String id) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(GET_USERNAME);
        statement.setString(1, id);
        return statement;
    }
}
