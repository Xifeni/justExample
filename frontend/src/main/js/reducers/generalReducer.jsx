import {
    SET_USER_FORM_ERROR,
    USER_LIST,
    CHANGE_PERMISSIONS,
    ADD_USERS,
    SET_ACTIVE_AREA,
    SET_ACTIVE_AREA_EDIT,
    REMOVE_USER_FORM_ERROR,
    UPDATE_NEW_USER,
    USERNAME,
    PASSWORD,
    RETRY_PASSWORD,
    FIRST_NAME,
    LAST_NAME,
    ADMIN,
    HAS_ERROR,
    CREATE_USER
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
    },
    presetUser: {
        [USERNAME]: "",
        [ADMIN]: "",
        [FIRST_NAME]: "",
        [LAST_NAME]: ""
    }

};

//todo: слишком много всего, нужно разбить

let generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_AREA : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case SET_ACTIVE_AREA_EDIT : {
            console.log(action.payload);
            let params = [USERNAME, LAST_NAME, FIRST_NAME, ADMIN];
            for (let param of params) {
                state.presetUser[param] = action.payload[param];
            }
            return Object.assign({}, state, {activeArea: CREATE_USER});
        }
        case ADD_USERS: {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case CHANGE_PERMISSIONS: {
            return Object.assign({}, state, {permission: action.payload});
        }
        case SET_USER_FORM_ERROR : {
            state.errorStatus[action.payload.name] = action.payload.message;
            state.errorStatus[HAS_ERROR] = true;
            return Object.assign({}, state);
        }
        case REMOVE_USER_FORM_ERROR : {
            let flag = true;
            state.errorStatus[action.payload.name] = "";
            for (let key in state.errorStatus) {
                (state.errorStatus[key] === "" || state.errorStatus[key] === false || state.errorStatus[key] === true) ? flag = flag && false : flag = true;
                //todo: это трешняк. надо переделать на что то более удобное.
            }
            state.errorStatus[HAS_ERROR] = flag;
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