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
}