package utils.connectionPool;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPoolImpl implements ConnectionPool {

    private static HikariConfig config;
    private static HikariDataSource ds;
    private static volatile ConnectionPool pool;


    private ConnectionPoolImpl() {
        config = new HikariConfig("/hikaricp.properties");
        ds = new HikariDataSource(config);
    }

    public static ConnectionPool getInstance() {
        ConnectionPool localPool = pool;
        if (localPool == null) {
            synchronized (ConnectionPoolImpl.class) {
                localPool = pool;
                if (localPool == null) {
                    pool = new ConnectionPoolImpl();
                }
            }
        }
        return pool;
    }

    public Connection getConnection() {
        Connection preparedConnection = null;
        try {
            preparedConnection = ds.getConnection();
            preparedConnection.setAutoCommit(false);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return preparedConnection;
    }

}
