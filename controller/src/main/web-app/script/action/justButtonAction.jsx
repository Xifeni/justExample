export const clickButton = () => {
    let rpcClient;

    window.onload = function () {
        rpcClient = new JSONRpcClient("JSON-RPC");
    };

    function sayHello() {
        rpcClient.rpcTester.getSayHello();
    }

    return {
        type: "JUST_BUTTON_WAS_CLICK",
    }
};


