package utils.transactionManager;

import utils.connectionPool.ConnectionPool;
import utils.connectionPool.ConnectionPoolImpl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class TransactionManager implements Manger {

    private ConnectionPool pool = new ConnectionPoolImpl();

    public List<ResultSet> executeTransaction(List<String> queries) throws SQLException {
        Connection connection = null;
        List<ResultSet> results = new ArrayList<ResultSet>();
        try {
            connection = pool.getConnection();
            for (String query : queries) {
                Statement statement = connection.createStatement();
                statement.executeQuery(query);
                ResultSet resultSet = statement.getResultSet();
                if (resultSet != null) {
                    results.add(resultSet);
                }
            }
            connection.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
        return results;
    }
}
