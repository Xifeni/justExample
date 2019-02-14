package controller;

import dao.UserDao;
import dao.UserDaoImpl;
import model.User;
import utils.userUtils.UserUtils;

import java.sql.SQLException;
import java.util.List;

public class UserDataController {
    private UserDao userDao = new UserDaoImpl();
    private UserUtils userUtils = new UserUtils();

    public List<User> getUsersList() throws SQLException {
        return userDao.getUsers();
    }

    public User getUser(String name) throws SQLException {
        return userDao.getUser(name);
    }

    public void saveNewUser(User user) throws SQLException {
        userUtils.getPreparedRole(user);
        userDao.saveNewUser(user);
    }

    public void saveEditedUser(User user, String oldEditableName) throws SQLException {
        userUtils.getPreparedPassword(user);
        userUtils.getPreparedRole(user);
        userDao.saveEditedUser(user, oldEditableName);
    }

    public void deleteUser(String username) throws SQLException {
        userDao.deleteUser(username);
    }
}
