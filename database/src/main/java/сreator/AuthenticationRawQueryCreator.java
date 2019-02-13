package сreator;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public interface AuthenticationRawQueryCreator {

    PreparedStatement getAuthenticatedUserRawQuery(Connection connection, String login, String password) throws SQLException;
    PreparedStatement getRegistrationRawQuery(Connection connection, String login, String sessionId) throws SQLException;
    PreparedStatement getRegisteredUserRawQuery(Connection connection, String sessionId) throws SQLException;
    PreparedStatement getLegitRequestRawQuery(Connection connection, String sessionId) throws SQLException;
    PreparedStatement getClearSessionRawQuery(Connection connection, String sessionId) throws SQLException;
    PreparedStatement getRawUsername(Connection connection, String id) throws SQLException;
}
