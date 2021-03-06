package сreator;

import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UserRawQueryCreatorImpl implements UserRawQueryCreator {

    private static final String CREATE_USER = "INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME, permissions, password) VALUES(?,?,?,?,?)";
    private static final String DELETE_USER = "DELETE FROM USERS where username = ?";
    private static final String GET_USERS = "SELECT * FROM USERS";
    private static final String GET_USER = "SELECT * FROM USERS where users.username = ?";
    private static final String UPDATE_USER = "UPDATE USERS SET USERS.FIRSTNAME = ?, " +
                                                                "USERS.LASTNAME = ?," +
                                                                "USERS.USERNAME = ?," +
                                                                "users.permissions = ?," +
                                                                "users.password = ? WHERE id = (SELECT id where username = ?)";
    private static final String GET_PASSWORD = "SELECT PASSWORD FROM users WHERE USERNAME = ?";
    private static final String IS_EXIST_USER = "SELECT EXISTS (SELECT * FROM USERS WHERE username = ?);";
    private static final String CREATE_SESSION = "INSERT INTO sessions (id) VALUES ((SELECT id from users where username = ?))";

    @Override
    public PreparedStatement getRawCreateUser(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(CREATE_USER);

        query.setString(1, user.getUserName());
        query.setString(2, user.getFirstName());
        query.setString(3, user.getLastName());
        query.setString(4, user.getRole());
        query.setString(5, user.getPassword());

        return query;
    }

    @Override
    public PreparedStatement getRawCreateSession(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(CREATE_SESSION);
        query.setString(1, user.getUserName());
        return query;
    }

    @Override
    public PreparedStatement getRawDeleteUser(Connection connection, String user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(DELETE_USER);
        query.setString(1, user);
        return query;
    }

    @Override
    public PreparedStatement getRawUsers(Connection connection) throws SQLException {
        return connection.prepareStatement(GET_USERS);
    }

    @Override
    public PreparedStatement getRawUpdateUser(Connection connection, User user, String oldEditableUsername) throws SQLException {
        PreparedStatement query = connection.prepareStatement(UPDATE_USER);

        query.setString(1, user.getFirstName());
        query.setString(2, user.getLastName());
        query.setString(3, user.getUserName());
        query.setString(4, user.getRole());
        query.setString(5, user.getPassword());
        query.setString(6, oldEditableUsername);

        return query;
    }

    @Override
    public PreparedStatement getPassword(Connection connection, String signatureUser) throws SQLException {
        PreparedStatement query = connection.prepareStatement(GET_PASSWORD);
        query.setString(1, signatureUser);
        return query;
    }

    @Override
    public PreparedStatement getIsExistUserRawQuery(Connection connection, String username) throws SQLException {
        PreparedStatement query = connection.prepareStatement(IS_EXIST_USER);
        query.setString(1, username);
        return query;
    }

    public PreparedStatement getRawUser(Connection connection, String name) throws SQLException {
        PreparedStatement query = connection.prepareStatement(GET_USER);
        query.setString(1, name);
        return query;
    }
}
