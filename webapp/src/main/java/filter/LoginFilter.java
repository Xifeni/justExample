package filter;

import controller.DataController;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;

@WebFilter(servletNames = "LoginFilter", urlPatterns = "/*")
public class LoginFilter implements Filter {

    private DataController controller = new DataController();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String sessionId = ((HttpServletRequest) request).getSession().getId();
        try {
            if (!controller.isCorrectRequest(sessionId)) {
                request.getRequestDispatcher("/login").forward(request, response);
            } else {
                chain.doFilter(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void destroy() {

    }
}
