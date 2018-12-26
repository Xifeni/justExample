package filter;

import controller.MainController;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

@WebFilter(urlPatterns = "/main.jsp")
public class AuthFilter implements Filter {

    private static final String SESSION_NAME = "JSESSIONID";
    private MainController controller = new MainController();

    public void init(FilterConfig filterConfig) throws ServletException {
        try {
            controller.clearSessions();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try {
            String sessionId = getSessionId(Arrays.asList(((HttpServletRequest) request).getCookies()));
            if (!controller.isCorrectRequest(sessionId)) {
                if (!controller.isCorrectRequest(request.getParameter("login"), request.getParameter("password"))) {
                    request.getRequestDispatcher("login.jsp").forward(request, response);
                } else {
                    controller.registerUserSession(request.getParameter("login"), sessionId);
                    request.getRequestDispatcher("main.jsp").forward(request, response);
                }
            }
            filterChain.doFilter(request,response);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void destroy() {

    }

    private String getSessionId(List<Cookie> coolies) {
        for (Cookie cookie : coolies) {
            if (cookie.getName().equals(SESSION_NAME)) {
                return cookie.getValue();
            }
        }
        return "";
    }
}
