package model;

import lombok.Getter;

public enum Role {
    ADMIN("111"),
    USER("100"),
    BANNED("000");

    @Getter
    private String permissions;

    Role(String permissions) {
        this.permissions = permissions;
    }
}
