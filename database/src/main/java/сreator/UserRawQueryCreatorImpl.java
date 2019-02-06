package сreator;

import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UserRawQueryCreatorImpl implements UserRawQueryCreator {

    private static final String CREATE_USER = "INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME) VALUES(?,?,?)";
    private static final String SET_USER_PERMISSION = "INSERT INTO PERMISSION (USERNAME, PERMISSION, ROLENAME) VALUES(?,?,?)";
    private static final String SET_USER_VAULT = "INSERT INTO VAULT (USERNAME, PASSWORD) VALUES(?,?)";
    private static final String DELETE_USER = "DELETE FROM USERS WHERE USERNAME = ?";
    private static final String GET_USERS = "SELECT * FROM USERS";
    private static final String GET_USER = "SELECT * FROM USERS inner JOIN permission on users.username=permission.username where users.username = ?";
    private static final String UPDATE_USER = "UPDATE USERS SET USERS.FIRSTNAME = ?, USERS.LASTNAME = ?, USERS.USERNAME = ? WHERE USERNAME = ?";
    private static final String UPDATE_PASSWORD = "UPDATE VAULT SET VAULT.PASSWORD = ? WHERE USERNAME = ?";
    private static final String UPDATE_PERMISSIONS = "UPDATE PERMISSION set permission = ? where username = ?";
    private static final String GET_PASSWORD = "SELECT PASSWORD FROM VAULT WHERE USERNAME = ?";
    private static final String IS_EXIST_USER = "SELECT EXISTS (SELECT * FROM USERS WHERE username = ?);";

    @Override
    public PreparedStatement getRawCreateUser(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(CREATE_USER);
        query.setString(1, user.getUserName());
        query.setString(2, user.getFirstName());
        query.setString(3, user.getLastName());
        return query;
    }

    @Override
    public PreparedStatement getRawCreateUserPermission(Connection connection, User user) throws SQLException {
        String permissions = user.getRole().equalsIgnoreCase("admin") ? "111" : "100";

        PreparedStatement query = connection.prepareStatement(SET_USER_PERMISSION);
        query.setString(1, user.getUserName());
        query.setString(2, permissions);
        query.setString(3, "ROLE_NAME HERE");
        return query;
    }

    @Override
    public PreparedStatement getRawCreatePassword(Connection connection, User user) throws SQLException{
        PreparedStatement query = connection.prepareStatement(SET_USER_VAULT);
        query.setString(1, user.getUserName());
        query.setString(2, user.getPassword());
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
    public PreparedStatement getRawUpdateUser(Connection connection, User user, String signatureUser) throws SQLException {
        PreparedStatement query = connection.prepareStatement(UPDATE_USER);
        query.setString(1, user.getFirstName());
        query.setString(2, user.getLastName());
        query.setString(3, user.getUserName());
        query.setString(4, signatureUser);
        return query;
    }

    @Override
    public PreparedStatement getRawUpdatePassword(Connection connection, User user, String password) throws SQLException {
        PreparedStatement query = connection.prepareStatement(UPDATE_PASSWORD);
        String pass = user.getPassword().isEmpty() ? password : user.getPassword();
        query.setString(1, pass);
        query.setString(2, user.getUserName());
        return query;
    }

    @Override
    public PreparedStatement getRawUpdatePermissions(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(UPDATE_PERMISSIONS);
        String permissions = user.getRole().equalsIgnoreCase("admin") ? "111" : "100";
        query.setString(1, permissions);
        query.setString(2, user.getUserName());
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
