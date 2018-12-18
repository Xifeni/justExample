public class Manager {
    private final ConnectionPool pool;
    Manager(){
        this.pool = new ConnectionPool();
    }

    Manager(int poolSize){
        this.pool = new ConnectionPool(poolSize);
    }
}
