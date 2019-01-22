let initialState = {
    activeArea: "MAIN",
    users: [{name: 'user1', role: 'admin'}, {name: 'user2', role: 'user'}, {name: 'user3', role: 'user'}],
    permission: "null"
};

let navReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVE_AREA" : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case "GET_HELLO" : {
            return Object.assign({}, state, {permission: action.payload});
        }
        case "SUCCESS": {
            return Object.assign({}, state, {loadingStatus: true});
        }
    }
    return state;
};

export default navReducer;