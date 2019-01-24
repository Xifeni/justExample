import {
    SET_USER_FORM_ERROR,
    USER_LIST,
    CHANGE_PERMISSIONS,
    ADD_USERS,
    SET_ACTIVE_AREA,
    REMOVE_USER_FORM_ERROR,
    UPDATE_NEW_USER
} from "../container/const.js";

let initialState = {
    activeArea: USER_LIST,
    users: [],
    permission: "null",
    hasError: "", //todo:заменить на массив ошибок
    textError: "",
    newUser: {
        "Username": "",
        "Password": "",
        "FirstName": "",
        "LastName": "",
        "Admin": false
    }
};

let navReducer = function (state = initialState, action) {
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
            return Object.assign({}, state, {hasError: true});
        }
        case REMOVE_USER_FORM_ERROR : {
            return Object.assign({}, state, {hasError: false});
        }
        case UPDATE_NEW_USER : {
            state.newUser[action.payload.name] = action.payload.value;
            return Object.assign({}, state);
        }
    }
    return state;
};

export default navReducer;