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
    public void saveUser(User user, String signatureUser) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        boolean isExistUser = isUserExist(user.getUserName());
        if (isExistUser && signatureUser.isEmpty()) {
            throw new SQLException("Username, Username is exist");
        }
        String password = "";
        if (isExistUser) {
            if (user.getPassword().isEmpty()) {
                password = getPassword(signatureUser);
            } else {
                password = user.getPassword();
            }
        }
        PreparedStatement query;
        if (!signatureUser.isEmpty()) {
            query = creator.getRawUpdateUser(connection, user, signatureUser);
            getResultSet(query);
            query = creator.getRawUpdatePassword(connection, user, password);
            getResultSet(query);
            query = creator.getRawUpdatePermissions(connection, user);
            getResultSet(query);
        } else {
            query = creator.getRawCreateUser(connection, user);
            getResultSet(query);
            query = creator.getRawCreatePassword(connection, user);
            getResultSet(query);
            query = creator.getRawCreateUserPermission(connection, user);
            getResultSet(query);
        }
    }


    private String getPassword(String signatureUser) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        PreparedStatement query = creator.getPassword(connection, signatureUser);
        return getResultSet(query).getString(1);

    }

    @Override
    public void deleteUser(String user) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        PreparedStatement query = creator.getRawDeleteUser(connection, user);
        getResultSet(query);
    }

    @Override
    public List<User> getUsers() throws SQLException {
        List<User> users = new ArrayList<>();

        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRawUsers(connection)) {
            ResultSet set = getResultSet(query);
            do {
                users.add(new User(set.getString("username"), set.getString("firstname"), set.getString("lastname")));
            } while (set.next());
            return users;
        }
    }

    private boolean isUserExist(String name) throws SQLException {
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
                    set.getString("permission"));
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
