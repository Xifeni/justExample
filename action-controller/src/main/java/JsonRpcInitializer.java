import org.jabsorb.JSONRPCBridge;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class JsonRpcInitializer 
    implements ServletContextListener {
  public void contextInitialized(ServletContextEvent event) {
    JsonRpcTester rpcTester = new JsonRpcTester();
    JSONRPCBridge globalBridge =
      JSONRPCBridge.getGlobalBridge();
    globalBridge.registerObject("rpcTester", rpcTester);
  }
  
  public void contextDestroyed(ServletContextEvent event) {
  }
}
