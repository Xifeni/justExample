import {
    USER_LIST,
    SET_CURRENT_USER,
    ADD_USERS,
    SET_ACTIVE_AREA,
    USERNAME,
    ADMIN,
    DELETE_USER
} from "../const.js";

let initialState = {
    activeArea: USER_LIST,
    users: [],
    currentUser: {
        [USERNAME]: "",
        [ADMIN]: ""
    },
};

let generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_AREA : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case ADD_USERS: {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case SET_CURRENT_USER: {
            return Object.assign({}, state, {
                currentUser: {
                    [USERNAME]: action.payload[USERNAME],
                    [ADMIN]: action.payload[ADMIN]
                }
            })
        }
        case DELETE_USER: {
            let index = state.users.indexOf(action.payload);
            state.users.splice(index, 1);
            return Object.assign({}, state);
        }
    }
    return state;
};

export default generalReducer;