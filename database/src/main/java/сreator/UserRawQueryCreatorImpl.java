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
    private static final String DELETE_USER = "DELETE INTO USERS WHERE USERNAME = ?";

    public List<PreparedStatement> getRawCreateUser(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(CREATE_USER);
        query.setString(1, user.getUserName());
        query.setString(2, user.getFirstName());
        query.setString(3, user.getLastName());

        PreparedStatement query2 = connection.prepareStatement(SET_USER_PERMISSION);
        query2.setString(1, user.getUserName());
        query2.setString(2, "000");
        query2.setString(3, "test");

        PreparedStatement query3 = connection.prepareStatement(SET_USER_VAULT);
        query3.setString(1, user.getUserName());
        query3.setString(2, "test");

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        queries.add(query2);
        queries.add(query3);
        return queries;
    }

    public List<PreparedStatement> getRawDeleteUser(Connection connection, User user) throws SQLException {
        PreparedStatement query = connection.prepareStatement(DELETE_USER);
        query.setString(1, user.getUserName());

        List<PreparedStatement> queries = new ArrayList<>();
        queries.add(query);
        return queries;
    }

    public List<PreparedStatement> getRawUsers() {
        throw new UnsupportedOperationException();
    }

    public List<PreparedStatement> getRawEditUser(User... users) {
        throw new UnsupportedOperationException();
    }
}
