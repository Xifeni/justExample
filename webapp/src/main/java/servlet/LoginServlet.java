package servlet;

import controller.AuthenticationDataController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import static utils.PasswordProcessor.getHashPassword;

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
            response.sendError(500, e.getMessage());
        }
    }
}
