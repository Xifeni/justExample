package rawCreator;

import model.User;

import java.util.List;

public interface CrudUserRawQueryCreator {

    List<String> getRawCreateUser(User user);
}
