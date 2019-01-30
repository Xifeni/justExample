package dao;

import сreator.AuthenticationRawQueryCreator;
import сreator.AuthenticationRawQueryCreatorImpl;
import utils.connectionPool.ConnectionPool;
import utils.connectionPool.ConnectionPoolImpl;
import utils.transactionManager.TransactionManagerImpl;

import java.sql.*;
import java.util.List;

public class AuthenticationDaoImpl implements AuthenticationDao {

    private TransactionManagerImpl transactionManagerImpl = new TransactionManagerImpl();
    private AuthenticationRawQueryCreator creator = new AuthenticationRawQueryCreatorImpl();
    private ConnectionPool pool = ConnectionPoolImpl.getInstance();

    @Override
    public boolean isAuthenticatedUser(String sessionId) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRegisteredUserRawQuery(connection, sessionId);
            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            set.next();
            return set.getBoolean(1);
        }
    }

    @Override
    public boolean isValidUser(String password, String login) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getAuthenticatedUserRawQuery(connection, password, login);
            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            set.next();
            return set.getBoolean(1);
        }
    }

    @Override
    public void registerSessionUser(String login, String sessionId) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRegistrationRawQuery(connection, login, sessionId);
            transactionManagerImpl.executeTransaction(query, connection);
        }
    }

    @Override
    public void clearSessions() throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getClearSessionsRawQuery(connection);
            transactionManagerImpl.executeTransaction(query, connection);
        }
    }

    @Override
    public String getUsername(String id) throws SQLException{
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getRawUsername(connection, id);
            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            set.next();
            return set.getString(1);
        }
    }

    @Override
    public String getUserPermission(String login) throws SQLException {
        try (Connection connection = pool.getConnection()) {
            List<PreparedStatement> query = creator.getLegitRequestRawQuery(connection, login);
            List<ResultSet> sets = transactionManagerImpl.executeTransaction(query, connection);

            ResultSet set = sets.get(0);
            set.next();
            return set.getString(1);
        }
    }
}
