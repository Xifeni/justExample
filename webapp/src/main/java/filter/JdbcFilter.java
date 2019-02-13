package filter;

import utils.connectionStore.ConnectionStore;
import utils.connectionPool.ConnectionPool;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebFilter(urlPatterns = "/*")
public class JdbcFilter implements Filter {
    private ConnectionPool pool;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        pool = ConnectionPool.getInstance();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try (Connection connection = pool.getConnection()) {
            ConnectionStore.setConnection(connection);
            chain.doFilter(request, response);
            try {
                connection.commit();
            } catch (SQLException e) {
                connection.rollback();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            ((HttpServletResponse) response).sendError(500, e.getMessage());
        } finally {
            ConnectionStore.setConnection(null);
        }
    }

    @Override
    public void destroy() {

    }
}
