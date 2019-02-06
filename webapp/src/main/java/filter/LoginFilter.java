package filter;

import controller.AuthenticationDataController;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebFilter(servletNames = "LoginFilter", urlPatterns = "/*")
public class LoginFilter implements Filter {

    private AuthenticationDataController controller = new AuthenticationDataController();

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String sessionId = ((HttpServletRequest) request).getSession().getId();
        try {
            int i = 0;
            request.setAttribute("counter", i);
            if (!controller.isCorrectRequest(sessionId)) {
                request.getRequestDispatcher("/login").forward(request, response);
            } else {
                chain.doFilter(request, response);
            }
            System.out.println("i:"+i);
        } catch (SQLException e) {
            e.printStackTrace();
            ((HttpServletResponse) response).sendError(404, e.getSQLState());
        }
    }

    @Override
    public void destroy() {

    }
}
