package dao;

import model.User;
import rawCreator.CrudUserRawQueryCreatorImpl;
import utils.transactionManager.TransactionManager;

import java.sql.SQLException;

public class CrudUserDaoImpl implements CrudUserDao {

    private TransactionManager transactionManager = new TransactionManager();
    private CrudUserRawQueryCreatorImpl creator = new CrudUserRawQueryCreatorImpl();

    public boolean createUser(User user) {
        try {
            transactionManager.executeTransaction(creator.getRawCreateUser(user));
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteUser() {
        return false;
    }

    public User getUser(String... params) {
        return null;
    }

    public boolean editUser(User user) {
        return false;
    }
}
