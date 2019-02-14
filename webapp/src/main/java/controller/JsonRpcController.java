package controller;

import exception.WrongPermission;
import model.User;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpSession;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import static utils.PasswordProcessor.getHashPassword;

public class JsonRpcController {

    private AuthenticationDataController authDataController = new AuthenticationDataController();
    private UserDataController userDataController = new UserDataController();


    public String getPermission(HttpSession session) throws SQLException {
        return authDataController.getPermissions(session.getId());
    }

    public User[] getUsers() throws SQLException {
        return userDataController.getUsersList().toArray(new User[0]);
    }

    public User getUser(String name, HttpSession session) throws SQLException, WrongPermission {
        if (isAdmin(session.getId())) {
            return userDataController.getUser(name);
        } else {
            throw new WrongPermission();
        }
    }

    public void saveNewUser(JSONObject jsonUser, HttpSession session) throws Exception {
        User user = getUser(jsonUser);
        if (isAdmin(session.getId())) {
            userDataController.saveNewUser(user);
        } else {
            throw new WrongPermission();
        }
    }

    public void saveEditedUser(JSONObject jsonUser, HttpSession session) throws Exception {
        User user = getUser(jsonUser);
        if (isAdmin(session.getId())) {
            userDataController.saveEditedUser(user, jsonUser.getString("oldEditableUsername"));
        } else {
            throw new WrongPermission();
        }
    }

    public void deleteUser(String username, HttpSession session) throws Exception {
        if (isAdmin(session.getId())) {
            userDataController.deleteUser(username);
        } else {
            throw new WrongPermission();
        }
    }

    private boolean isAdmin(String sessionId) throws SQLException {
        return authDataController.getPermissions(sessionId).equalsIgnoreCase("111");
    }

    private User getUser(JSONObject jsonUser) throws JSONException, NoSuchAlgorithmException, InvalidKeyException {
        return new User(jsonUser.getString("Username"),
                jsonUser.getString("First name"),
                jsonUser.getString("Last name"),
                jsonUser.getString("Admin"),
                getHashPassword(jsonUser.getString("Password"), "salt"));
    }
}