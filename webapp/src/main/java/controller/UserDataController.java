package controller;

import dao.UserDao;
import dao.UserDaoImpl;
import model.User;

import java.sql.SQLException;
import java.util.List;

public class UserDataController {
    private UserDao userDao = new UserDaoImpl();

    public List<User> getUsersList() {
        return userDao.getUsers();
    }

    public User getUser(String name) throws SQLException {
        return userDao.getUser(name);
    }

    public void saveUser(User user, String isCreateNewUser) throws SQLException {
        userDao.saveUser(user, isCreateNewUser);
    }

    public void deleteUser(String username) {
        userDao.deleteUser(username);
    }
}
