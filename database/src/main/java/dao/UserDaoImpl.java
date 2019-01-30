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
            throw new SQLException("Username is exist");
        }
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries;
            queries = isExistUser ? creator.getRawUpdateUser(connection, user, signatureUser) : creator.getRawCreateUser(connection, user);
            transactionManagerImpl.executeTransaction(queries, connection);
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

    @Override
    public void editUser(User user) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isUserExist(String name) throws SQLException {
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
                users.add(new User(set.getString("username"), set.getString("firstname"), set.getString("lastname")));
            }
            return users.get(0);
        }
    }
}
