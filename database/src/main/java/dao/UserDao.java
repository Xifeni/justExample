package dao;

import model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    void saveUser(User user, String isCreateNewUser) throws SQLException;
    void deleteUser(String user);
    List<User> getUsers();
    void editUser(User users);

    User getUser(String name) throws SQLException;

    boolean isUserExist(String name) throws SQLException;
}
