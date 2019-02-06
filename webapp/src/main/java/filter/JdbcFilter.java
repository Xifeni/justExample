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
        try (Connection connection = pool.getConnection()){
            ConnectionStore.setConnection(connection);
            chain.doFilter(request,response);

            tryCommittedConnection(connection);
        } catch (SQLException e) {
            e.printStackTrace();
            ((HttpServletResponse)response).sendError(500, e.getMessage());
        }
    }

    private void tryCommittedConnection(Connection connection) throws SQLException {
        try {
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            throw new SQLException(e);
        }
    }

    @Override
    public void destroy() {

    }
}
