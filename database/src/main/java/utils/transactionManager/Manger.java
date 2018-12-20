package utils.transactionManager;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public interface Manger {

    List<ResultSet> executeTransaction(List<String> query) throws SQLException;
}
