package utils.connectionPool;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPoolImpl implements ConnectionPool{

    private HikariConfig config = new HikariConfig("/hikaricp.properties");
    private HikariDataSource ds = new HikariDataSource(config);

    ConnectionPoolImpl(int poolSize) {
        ds.setMaximumPoolSize(poolSize);
    }

    public ConnectionPoolImpl() {
    }

    public Connection getConnection() throws SQLException {
        Connection preparedConnection = ds.getConnection();
        //preparedConnection.setAutoCommit(false);
        return preparedConnection;

    }

}
