package utils.transactionManager;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TransactionManagerImpl implements TransactionManager {

    public List<ResultSet> executeTransaction(List<PreparedStatement> queries, Connection connection) throws SQLException {
        List<ResultSet> resultSets = new ArrayList<>();
        try {
            for (PreparedStatement query : queries) {
                query.execute();
                resultSets.add(query.getResultSet());
            }
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            e.printStackTrace();
        }
        return resultSets;
    }
}
