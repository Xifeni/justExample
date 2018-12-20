package dao;

import model.User;

public interface CrudUserDao {
    boolean createUser(User user);
    boolean deleteUser();
    User getUser(String... params);
    boolean editUser(User users);
}
