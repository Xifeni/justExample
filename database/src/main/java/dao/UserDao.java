package dao;

import model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    void saveUser(User user, String isCreateNewUser) throws SQLException;

    void deleteUser(String user) throws SQLException;

    List<User> getUsers() throws SQLException;

    User getUser(String name) throws SQLException;
}
