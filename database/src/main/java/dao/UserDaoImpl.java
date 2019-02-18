package dao;

import model.User;
import utils.connectionStore.ConnectionStore;
import сreator.UserRawQueryCreatorImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDaoImpl implements UserDao {

    private UserRawQueryCreatorImpl creator = new UserRawQueryCreatorImpl();

    @Override
    public void saveNewUser(User user) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        if (isUserExist(user.getUserName())) {
            throw new SQLException("Username, Username is exist");
        }
        if (user.haveAnyEmptyField()) {
            throw new SQLException("All field is required");
        }
        try (PreparedStatement query = creator.getRawCreateUser(connection, user)) {
            getResultSet(query);
        }
        try (PreparedStatement query = creator.getRawCreateSession(connection, user)) {
            getResultSet(query);
        }
    }

    @Override
    public void saveEditedUser(User user, String oldEditableUsername) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        String username = user.getUserName();
        if (!username.equals(oldEditableUsername) && isUserExist(username)) {
            throw new SQLException("Username, Username is exist");
        }
        try (PreparedStatement query = creator.getRawUpdateUser(connection, user, oldEditableUsername)) {
            getResultSet(query);
        }
    }

    @Override
    public String getPassword(String username) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getPassword(connection, username)) {
            return getResultSet(query).getString(1);
        }
    }

    @Override
    public void deleteUser(String username) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRawDeleteUser(connection, username)) {
            getResultSet(query);
        }
    }

    @Override
    public List<User> getUsers() throws SQLException {
        List<User> users = new ArrayList<>();
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRawUsers(connection)) {
            ResultSet set = getResultSet(query);
            do {
                users.add(new User(set.getString("username"),
                        set.getString("firstname"),
                        set.getString("lastname")));
            } while (set.next());
            return users;
        }
    }

    @Override
    public boolean isUserExist(String name) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getIsExistUserRawQuery(connection, name)) {
            return getResultSet(query).getBoolean(1);
        }
    }

    @Override
    public User getUser(String name) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRawUser(connection, name)) {
            ResultSet set = getResultSet(query);
            return new User(set.getString("username"),
                    set.getString("firstname"),
                    set.getString("lastname"),
                    set.getString("permissions"));
        }
    }

    private ResultSet getResultSet(PreparedStatement query) throws SQLException {
        query.execute();
        ResultSet set = query.getResultSet();
        if (set != null) {
            set.next();
        }
        return set;
    }
}
