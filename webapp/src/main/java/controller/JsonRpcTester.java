package controller;

import model.User;

import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.List;

public class JsonRpcTester {

    DataController dataController = new DataController();

    public String getPermission(String name) throws SQLException {
        return dataController.getPermissions(name);
    }

    public User[] getUsers() {
        return dataController.getUsersList().toArray(new User[0]);
    }

    public void logout() throws SQLException {
        dataController.clearSessions();
    }

    public User getUser(String name) throws SQLException {
        return dataController.getUser(name);
    }

    public void saveEditedUser(User user){
        System.out.println(user);
    }
}