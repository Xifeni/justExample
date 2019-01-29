package validator;

import controller.DataController;
import lombok.AllArgsConstructor;
import model.User;

import java.sql.SQLException;

@AllArgsConstructor
public class UserValidator {

    private final User user;
    private final DataController controller = new DataController();

    public void isValidUser(){

    }

    private boolean validUserName() throws SQLException {
        String name = user.getUserName();
        return controller.isUserExist(name);
    }
}
