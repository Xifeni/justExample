package model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String userName;
    private String firstName;
    private String lastName;
    private int role;
    private String password;
}
