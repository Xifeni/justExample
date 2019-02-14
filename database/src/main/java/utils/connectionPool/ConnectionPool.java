package utils.connectionPool;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPool {

    private static HikariDataSource ds;
    private static ConnectionPool pool = new ConnectionPool();

    private ConnectionPool() {
    }

    public void init(){
        HikariConfig config = new HikariConfig("/hikaricp.properties");
        ds = new HikariDataSource(config);
    }

    public static ConnectionPool getInstance() {
        return pool;
    }

    public Connection getConnection() throws SQLException {
        Connection preparedConnection = ds.getConnection();
        preparedConnection.setAutoCommit(false);
        return preparedConnection;
    }
}