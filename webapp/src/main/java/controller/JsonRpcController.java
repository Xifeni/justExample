package controller;

import exception.WrongPermission;
import model.User;
import org.json.JSONObject;

import java.sql.SQLException;

public class JsonRpcController {

    private AuthenticationDataController authDataController = new AuthenticationDataController();
    private UserDataController userDataController = new UserDataController();


    public String getPermission(String name) throws SQLException {
        return authDataController.getPermissions(name);
    }

    public User[] getUsers() {
        return userDataController.getUsersList().toArray(new User[0]);
    }

    public void logout(String username) throws SQLException {
        authDataController.logout(username);
    }

    public User getUser(String name, String signatureUser) throws SQLException, WrongPermission {
        if (authDataController.getPermissions(signatureUser).equalsIgnoreCase("111")) {
            return userDataController.getUser(name);
        } else {
            throw new WrongPermission();
        }
    }

    public void saveUser(JSONObject jsonUser, String signatureUser) throws Exception {
        User user = new User(jsonUser.getString("Username"),
                jsonUser.getString("First name"),
                jsonUser.getString("Last name"),
                jsonUser.getString("Admin"),
                jsonUser.getString("Password"));
        if (authDataController.getPermissions(signatureUser).equalsIgnoreCase("111")) {
            userDataController.saveUser(user, jsonUser.getString("signatureUser"));
        } else {
            throw new WrongPermission();
        }
    }

    public void deleteUser(String username, String signatureUser) throws Exception {
        if (authDataController.getPermissions(signatureUser).equalsIgnoreCase("111")) {
            userDataController.deleteUser(username);
        } else {
            throw new WrongPermission();
        }
    }
}