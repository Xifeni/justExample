package сreator;

import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public interface UserRawQueryCreator {

    List<PreparedStatement> getRawCreateUser(Connection connection, User user) throws SQLException;
    List<PreparedStatement> getRawDeleteUser(Connection connection, User user) throws SQLException;
    List<PreparedStatement> getRawUsers();
    List<PreparedStatement> getRawEditUser(User... users);
}
