package filter;

import utils.connectionStore.ConnectionStore;
import utils.connectionPool.ConnectionPool;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebFilter(urlPatterns = {"/login", "/main", "/JSON-RPC", "/logout"})
public class JdbcFilter implements Filter {
    private ConnectionPool pool;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        pool = ConnectionPool.getInstance();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try (Connection connection = pool.getConnection()) {
            try {
                ConnectionStore.setConnection(connection);
                chain.doFilter(request, response);
                connection.commit();
            } catch (SQLException e) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                    throw new ServletException(e1);
                }
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new ServletException(e);
        } finally {
            ConnectionStore.setConnection(null);
        }
    }

    @Override
    public void destroy() {

    }
}
