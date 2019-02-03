package controller;
import org.jabsorb.JSONRPCBridge;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class JsonRpcInitializer implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent event) {
        JsonRpcController rpcTester = new JsonRpcController();
        JSONRPCBridge globalBridge = JSONRPCBridge.getGlobalBridge();
        globalBridge.registerObject("rpcTester", rpcTester);
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
    }
}