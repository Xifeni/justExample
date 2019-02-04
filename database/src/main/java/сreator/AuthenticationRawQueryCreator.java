package сreator;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public interface AuthenticationRawQueryCreator {

    List<PreparedStatement> getAuthenticatedUserRawQuery(Connection connection, String login, String password) throws SQLException;
    List<PreparedStatement> getRegistrationRawQuery(Connection connection, String login, String sessionId) throws SQLException;
    List<PreparedStatement> getRegisteredUserRawQuery(Connection connection, String sessionId) throws SQLException;
    List<PreparedStatement> getLegitRequestRawQuery(Connection connection, String sessionId) throws SQLException;
    List<PreparedStatement> getClearSessionRawQuery(Connection connection, String Username) throws SQLException;
    List<PreparedStatement> getRawUsername(Connection connection, String id) throws SQLException;
}
