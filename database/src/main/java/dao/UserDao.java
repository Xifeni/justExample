package dao;

import model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    void createUser(User user);
    void deleteUser(String user);
    List<User> getUsers();
    void editUser(User users);

    User getUser(String name) throws SQLException;

    boolean isUserExist(String name) throws SQLException;
}
