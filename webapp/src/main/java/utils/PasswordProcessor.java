package utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class PasswordProcessor {
    public static String getHashPassword(String password, String salt) throws NoSuchAlgorithmException, InvalidKeyException {
        if (password != null) {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(salt.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secretKey);
            byte[] hashInBytes = sha256_HMAC.doFinal(password.getBytes(StandardCharsets.UTF_8));
            password = DatatypeConverter.printHexBinary(hashInBytes).toLowerCase();
        }
        return password;
    }
}
