package dao;

import model.User;
import сreator.UserRawQueryCreatorImpl;
import utils.connectionPool.ConnectionPool;
import utils.connectionPool.ConnectionPoolImpl;
import utils.transactionManager.TransactionManagerImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDaoImpl implements UserDao {

    private TransactionManagerImpl transactionManagerImpl = new TransactionManagerImpl();
    private UserRawQueryCreatorImpl creator = new UserRawQueryCreatorImpl();
    private ConnectionPool pool = ConnectionPoolImpl.getInstance();

    @Override
    public void saveUser(User user, String signatureUser) throws SQLException {
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
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries;
            if (!signatureUser.isEmpty()) {
                queries = creator.getRawUpdateUser(connection, user, signatureUser, password);
            } else {
                queries = creator.getRawCreateUser(connection, user);
            }
            transactionManagerImpl.executeTransaction(queries, connection);
        }
    }

    private String getPassword(String signatureUser) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries;
            queries = creator.getPassword(connection, signatureUser);

            List<ResultSet> sets = transactionManagerImpl.executeTransaction(queries, connection);
            ResultSet set = sets.get(0);
            set.next();
            return set.getString(1);
        }
    }

    @Override
    public void deleteUser(String user) {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries = creator.getRawDeleteUser(connection, user);
            transactionManagerImpl.executeTransaction(queries, connection);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> getUsers() {
        List<User> users = new ArrayList<>();

        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRawUsers(connection);

            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            while (set.next()) {
                users.add(new User(set.getString("username"), set.getString("firstname"), set.getString("lastname")));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }

    private boolean isUserExist(String name) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRawUser(connection, name);

            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            return set.isBeforeFirst();
        }
    }

    @Override
    public User getUser(String name) throws SQLException {
        List<User> users = new ArrayList<>();

        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRawUser(connection, name);
            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);
            ResultSet set = sets.get(0);
            while (set.next()) {
                users.add(new User(set.getString("username"), set.getString("firstname"), set.getString("lastname"), set.getString("permission")));
            }
            return users.get(0);
        }
    }
}
