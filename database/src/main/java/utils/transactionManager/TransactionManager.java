package utils.transactionManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public interface TransactionManager {

    List<ResultSet> executeTransaction(List<PreparedStatement> query, Connection connection) throws SQLException;
}
