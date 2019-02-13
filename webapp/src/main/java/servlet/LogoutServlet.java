package servlet;

import controller.AuthenticationDataController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/logout")
public class LogoutServlet extends HttpServlet {

    private AuthenticationDataController authDataController = new AuthenticationDataController();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            authDataController.logout(req.getSession().getId());
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(500, e.getMessage());
        }
    }
}
