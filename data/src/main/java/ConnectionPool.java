import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPool {

    private HikariConfig config = new HikariConfig("/hikaricp.properties");
    private HikariDataSource ds = new HikariDataSource(config);

    ConnectionPool(int poolSize) {
        ds.setMaximumPoolSize(poolSize);
    }

    ConnectionPool() {

    }

    public Connection getConnectionWithDisabledAutoCommit() throws SQLException {
        Connection preparedConnection = ds.getConnection();
        preparedConnection.setAutoCommit(false);
        return preparedConnection;
    }
}
