import {
    SET_USER_FORM_ERROR,
    USER_LIST,
    CHANGE_PERMISSIONS,
    ADD_USERS,
    SET_ACTIVE_AREA,
    REMOVE_USER_FORM_ERROR,
    UPDATE_NEW_USER,
    USERNAME,
    PASSWORD,
    RETRY_PASSWORD,
    FIRST_NAME,
    LAST_NAME,
    ADMIN,
    HAS_ERROR
} from "../container/const.js";

let initialState = {
    activeArea: USER_LIST,
    users: [],
    permission: "null",
    textError: "",
    newUser: {
        [USERNAME]: "",
        [PASSWORD]: "",
        [RETRY_PASSWORD]: "",
        [FIRST_NAME]: "",
        [LAST_NAME]: "",
        [ADMIN]: false
    },
    errorStatus: {
        [USERNAME]: "",
        [PASSWORD]: "",
        [RETRY_PASSWORD]: "",
        [FIRST_NAME]: "",
        [LAST_NAME]: "",
        [HAS_ERROR]: false
    }

};

let generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_AREA : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case ADD_USERS: {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case CHANGE_PERMISSIONS: {
            return Object.assign({}, state, {permission: action.payload});
        }
        case SET_USER_FORM_ERROR : {
            state.errorStatus[action.payload.name] = action.payload.message;
            return Object.assign({}, state);
        }
        case REMOVE_USER_FORM_ERROR : {
            state.errorStatus[action.payload.name] = {};
            return Object.assign({}, state);
        }
        case UPDATE_NEW_USER : {
            state.newUser[action.payload.name] = action.payload.value;
            return Object.assign({}, state);
        }
    }
    return state;
};

export default generalReducer;