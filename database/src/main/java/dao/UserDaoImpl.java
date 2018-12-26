package dao;

import model.User;
import сreator.UserRawQueryCreatorImpl;
import utils.connectionPool.ConnectionPool;
import utils.connectionPool.ConnectionPoolImpl;
import utils.transactionManager.TransactionManagerImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

public class UserDaoImpl implements UserDao {

    private TransactionManagerImpl transactionManagerImpl = new TransactionManagerImpl();
    private UserRawQueryCreatorImpl creator = new UserRawQueryCreatorImpl();
    private ConnectionPool pool = ConnectionPoolImpl.getInstance();

    @Override
    public void createUser(User user) {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries = creator.getRawCreateUser(connection, user);
            transactionManagerImpl.executeTransaction(queries, connection);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteUser(User user) {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> queries = creator.getRawDeleteUser(connection, user);
            transactionManagerImpl.executeTransaction(queries, connection);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> getUsers() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void editUser(User user) {
        throw new UnsupportedOperationException();
    }
}
