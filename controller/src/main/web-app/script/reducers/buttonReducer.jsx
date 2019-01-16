import _ from 'lodash';

let rpcClient;

window.onload = function () {
    rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello() {
    rpcClient.rpcTester.getSayHello();
}

let initialState = {
    buttons: [{name: '1', text: '1'}, {name: '2', text: '2'}],
    users: [{name: 'user1', role: 'role1'}, {name: 'user2', role: 'role2'}, {name: 'user3', role: 'role3'}]
};

let buttonReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_STATE": {
            let newState = state.concat(action.state);
            return newState;
        }
        case "GREETING_AND_DELETE": {
            sayHello();
            let filteredButtons = _.filter(state.buttons, button => button.name !== action.button);
            return Object.assign({}, state, {buttons: filteredButtons})
        }
    }
    return state;
};

console.log("this is reducer state" + initialState);
export default buttonReducer;