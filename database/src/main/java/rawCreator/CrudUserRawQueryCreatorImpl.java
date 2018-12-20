package rawCreator;

import model.User;

import java.util.ArrayList;
import java.util.List;

public class CrudUserRawQueryCreatorImpl implements CrudUserRawQueryCreator{

    static final String CREATE_USER = "INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME) VALUES('%1$s','%2$s','%3$s')";
    static final String SET_USER_PERMISSION = "INSERT FROM PERMISSION (USERNAME, PERMISSION, ROLENAME) VALUES('test','0000','testRole')";
    static final String SET_USER_VAULT = "INSERT FROM VAULT (USERNAME, PASSWORD) VALUES('test','hash')";

    public List<String> getRawCreateUser(User user) {
        List<String> query = new ArrayList<String>();
        query.add(String.format(CREATE_USER, user.getUsername(), user.getFirstName(), user.getLastName()));
        query.add(SET_USER_PERMISSION);
        query.add(SET_USER_VAULT);
        return query;
    }

    public String getRawDeleteUser() {
        return null;
    }

    public String getRawUser(String... params) {
        return null;
    }

    public String getRawEditUser(User... users) {
        return null;
    }
}
