var Map = require("immutable").Map;

let rpcClient;

window.onload = function () {
    rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello() {
    rpcClient.rpcTester.getSayHello();
}

var reducer = function(state = Map(), action) {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);
        case "ADD_PHONE":
            return state.update("phones", (phones) => phones.push(action.phone));
        case "DELETE_PHONE":
            sayHello();
            return state.update("phones",
                (phones) => phones.filterNot(
                    (item) => item === action.phone
                )
            );
    }
    return state;
}
module.exports = reducer;