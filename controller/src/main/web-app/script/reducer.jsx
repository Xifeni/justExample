import {Map} from "immutable";

let rpcClient;

window.onload = function () {
    rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello() {
    rpcClient.rpcTester.getSayHello();
}

let reducer = function (state = Map(), action) {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);
        case "GREETING":
            sayHello();
            return state.update("buttons",
                (buttons) => buttons.filterNot(
                    (item) => item === action.button
                )
            );
    }
    return state;
};

export default reducer;