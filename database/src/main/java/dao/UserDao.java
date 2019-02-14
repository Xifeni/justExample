package dao;

import model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    void saveNewUser(User user) throws SQLException;

    void saveEditedUser(User user, String oldEditableUserName) throws SQLException;

    String getPassword(String signatureUser) throws SQLException;

    void deleteUser(String user) throws SQLException;

    List<User> getUsers() throws SQLException;

    boolean isUserExist(String name) throws SQLException;

    User getUser(String name) throws SQLException;
}
