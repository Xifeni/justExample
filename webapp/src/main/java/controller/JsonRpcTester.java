package controller;

import model.User;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpSession;
import java.sql.Array;
import java.sql.SQLException;
import java.util.ArrayList;
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

    public String saveEditedUser(JSONObject jsonUser) throws JSONException, SQLException {
        User user = new User(jsonUser.getString("Username"),
                jsonUser.getString("First name"),
                jsonUser.getString("Last name"),
                jsonUser.getString("Admin"),
                jsonUser.getString("Password"));
        dataController.saveUser(user);
        return "";
    }

    public void deleteUser(String username) {
        dataController.deleteUser(username);
    }
}