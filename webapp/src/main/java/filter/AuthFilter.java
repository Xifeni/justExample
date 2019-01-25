package filter;

import controller.DataController;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;

@WebFilter(urlPatterns = "/*", servletNames = {"AuthenticationServlet", "main"})
public class AuthFilter implements Filter {

    private DataController controller = new DataController();

    public void init(FilterConfig filterConfig) throws ServletException {
        try {
            controller.clearSessions();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try {
            String sessionId = ((HttpServletRequest) request).getSession().getId();

            if (!controller.isCorrectRequest(sessionId)) {
                if (!controller.isCorrectRequest(request.getParameter("login"), request.getParameter("password"))) {
                    request.getRequestDispatcher("/WEB-INF/login.jsp").forward(request, response);
                } else {
                    controller.registerUserSession(request.getParameter("login"), sessionId);
                    request.getRequestDispatcher("/index.html").forward(request, response);
                }
            }

            filterChain.doFilter(request, response);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void destroy() {

    }
}
