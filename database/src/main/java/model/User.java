package model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String userName;
    private String firstName;
    private String lastName;
    private String role;
    private String password;

    public User(String userName, String firstName, String lastName){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
