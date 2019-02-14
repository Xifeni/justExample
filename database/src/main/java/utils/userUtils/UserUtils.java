package utils.userUtils;

import dao.UserDaoImpl;
import model.User;

import java.sql.SQLException;

public class UserUtils {

    private UserDaoImpl userDao = new UserDaoImpl();

    public void getPreparedPassword(User user) throws SQLException {
        String pass = user.getPassword().isEmpty() ? userDao.getPassword(user.getUserName()) : user.getPassword();
        user.setPassword(pass);
    }

    public void getPreparedRole(User user) {
        String permissions = user.getRole().equalsIgnoreCase("admin") ? "111" : "100";
        user.setRole(permissions);
    }
}
