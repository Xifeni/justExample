import {userList} from "../container/const";

let initialState = {
    activeArea: userList,
    users: [],
    permission: "null"
};

let navReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVE_AREA" : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case "ADD_USERS": {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case "CHANGE_PERMISSIONS": {
            return Object.assign({}, state, {permission: action.payload});
        }
    }
    return state;
};

export default navReducer;