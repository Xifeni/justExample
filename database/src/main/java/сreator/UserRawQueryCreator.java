package сreator;

import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public interface UserRawQueryCreator {

    PreparedStatement getRawDeleteUser(Connection connection, String user) throws SQLException;

    PreparedStatement getRawUsers(Connection connection) throws SQLException;

    PreparedStatement getRawUser(Connection connection, String name) throws SQLException;

    PreparedStatement getPassword(Connection connection, String signatureUser) throws SQLException;

    PreparedStatement getIsExistUserRawQuery(Connection connection, String username) throws SQLException;

    PreparedStatement getRawUpdateUser(Connection connection, User user, String signatureUser, String password) throws SQLException;

    PreparedStatement getRawCreateUser(Connection connection, User user) throws SQLException;
}
