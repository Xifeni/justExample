package servlet;

import controller.AuthenticationDataController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/login", name = "login")
public class LoginServlet extends HttpServlet {

    private AuthenticationDataController controller = new AuthenticationDataController();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String login = request.getParameter("login");
            String password = request.getParameter("password");
            String sessionId = request.getSession().getId();
            boolean isLogged = false;

            if (login != null && password != null) {
                isLogged = controller.isCorrectRequest(login, getHashPassword(password, "salt"));
            }
            if (isLogged) {
                controller.registerUserSession(request.getParameter("login"), sessionId);
                response.sendRedirect("/main");
            } else {
                response.sendRedirect("/login");
            }
        } catch (SQLException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
    }

    private String getHashPassword(String password, String salt) throws NoSuchAlgorithmException, InvalidKeyException {
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
