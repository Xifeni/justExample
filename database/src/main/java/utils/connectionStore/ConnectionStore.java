package utils.connectionStore;

import java.sql.Connection;

public class ConnectionStore {
    private static ThreadLocal<Connection> connectionStore = new ThreadLocal<>();

    public static void setConnection(Connection connection){
        connectionStore.set(connection);
    }

    public static Connection getConnection(){
        return connectionStore.get();
    }
}
