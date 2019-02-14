package dao;

import utils.connectionStore.ConnectionStore;
import сreator.AuthenticationRawQueryCreator;
import сreator.AuthenticationRawQueryCreatorImpl;

import java.sql.*;

public class AuthenticationDaoImpl implements AuthenticationDao {

    private AuthenticationRawQueryCreator creator = new AuthenticationRawQueryCreatorImpl();

    @Override
    public boolean isAuthenticatedUser(String sessionId) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRegisteredUserRawQuery(connection, sessionId)) {
            return getResultSet(query).getBoolean(1);
        }
    }

    @Override
    public boolean isValidUser(String login, String password) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getAuthenticatedUserRawQuery(connection, login, password)) {
            return getResultSet(query).getBoolean(1);
        }
    }

    @Override
    public void registerSessionUser(String login, String sessionId) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRegistrationRawQuery(connection, login, sessionId)) {
            getResultSet(query);
        }
    }

    @Override
    public void clearSession(String sessionId) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getClearSessionRawQuery(connection, sessionId)) {
            getResultSet(query);
        }
    }

    @Override
    public String getUsername(String id) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getRawUsername(connection, id)) {
            return getResultSet(query).getString(1);
        }
    }

    @Override
    public String getUserPermission(String login) throws SQLException {
        Connection connection = ConnectionStore.getConnection();
        try (PreparedStatement query = creator.getLegitRequestRawQuery(connection, login)) {
            return getResultSet(query).getString(1);
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
