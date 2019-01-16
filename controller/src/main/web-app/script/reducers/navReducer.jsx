import _ from 'lodash';

let rpcClient;

window.onload = function () {
    rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello() {
    rpcClient.rpcTester.getSayHello();
}

let initialState = {
    activeArea: "MAIN",
    areas: [{name: 'MAIN', text: 'Список пользователей'}, {name: 'GOD', text: 'Создать нового пользователя'}, {name: 'LOGOUT', text: 'Выйти'}],
    users: [{name: 'user1', role: 'admin'}, {name: 'user2', role: 'user'}, {name: 'user3', role: 'user'}]
};

let navReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVE_AREA" : {
            return Object.assign({}, state, {activeArea: action.idArea});
        }
    }
    return state;
};

console.log("this is reducer state" + initialState);
export default navReducer;