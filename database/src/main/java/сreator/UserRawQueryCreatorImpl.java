package сreator;

import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserRawQueryCreatorImpl implements UserRawQueryCreator {

    private static final String CREATE_USER = "INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME) VALUES(?,?,?)";
    private static final String SET_USER_PERMISSION = "INSERT INTO PERMISSION (USERNAME, PERMISSION, ROLENAME) VALUES(?,?,?)";
    private static final String SET_USER_VAULT = "INSERT INTO VAULT (USERNAME, PASSWORD) VALUES(?,?)";
    private static final String DELETE_USER = "DELETE FROM USERS WHERE USERNAME = ?";
    private static final String GET_USERS = "SELECT * FROM USERS";
    private static final String GET_USER = "SELECT * FROM USERS inner JOIN permission on users.username=permission.username where users.username = ?";
    private static final String UPDATE_USER = "UPDATE USERS SET FIRSTNAME = ?, LASTNAME = ?, USERNAME = ? WHERE USERNAME = ?";

    public List<PreparedStatement> getRawCreateUser(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(CREATE_USER);
        query.setString(1, user.getUserName());
        query.setString(2, user.getFirstName());
        query.setString(3, user.getLastName());

        String permissions = user.getRole().equalsIgnoreCase("admin") ? "111" : "100";

        PreparedStatement query2 = connection.prepareStatement(SET_USER_PERMISSION);
        query2.setString(1, user.getUserName());
        query2.setString(2, permissions);
        query2.setString(3, "ROLE_NAME HERE");

        PreparedStatement query3 = connection.prepareStatement(SET_USER_VAULT);
        query3.setString(1, user.getUserName());
        query3.setString(2, user.getPassword());

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        queries.add(query2);
        queries.add(query3);
        return queries;
    }

    public List<PreparedStatement> getRawDeleteUser(Connection connection, String user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(DELETE_USER);
        query.setString(1, user);

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        return queries;
    }

    public List<PreparedStatement> getRawUsers(Connection connection) throws SQLException {
        PreparedStatement query = connection.prepareStatement(GET_USERS);
        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        return queries;
    }

    @Override
    public List<PreparedStatement> getRawUpdateUser(Connection connection, User user, String signatureUser) throws SQLException {
        PreparedStatement query = connection.prepareStatement(UPDATE_USER);
        query.setString(1, user.getFirstName());
        query.setString(2, user.getLastName());
        query.setString(3, user.getUserName());
        query.setString(4, signatureUser);

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        return queries;
    }

    public List<PreparedStatement> getRawUser(Connection connection, String name) throws SQLException {
        PreparedStatement query = connection.prepareStatement(GET_USER);
        query.setString(1, name);

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        return queries;
    }

    public List<PreparedStatement> getRawEditUser(User... users) {
        throw new UnsupportedOperationException();
    }
}
