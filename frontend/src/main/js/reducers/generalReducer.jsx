import {
    SET_USER_FORM_ERROR,
    USER_LIST,
    SET_CURRENT_USER,
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
    },
    currentUser: {
        [USERNAME]: "",
        [ADMIN]: ""
    }
};

//todo: слишком много всего, нужно разбить

let generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_AREA : {
            //todo: это грязно?
            state.presetUser = {
                [USERNAME]: "",
                [ADMIN]: "",
                [FIRST_NAME]: "",
                [LAST_NAME]: ""
            };
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case SET_ACTIVE_AREA_EDIT : {
            let params = [USERNAME, LAST_NAME, FIRST_NAME, ADMIN];
            for (let param of params) {
                state.presetUser[param] = action.payload[param];
            }
            return Object.assign({}, state, {activeArea: CREATE_USER});
        }
        case ADD_USERS: {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case SET_CURRENT_USER: {
            console.log("current user:"+ action.payload[USERNAME]+'/'+action.payload[ADMIN]);
            return Object.assign({}, state, {
                currentUser: {
                    [USERNAME]: action.payload[USERNAME],
                    [ADMIN]: action.payload[ADMIN]
                }
            })
        }
        case SET_USER_FORM_ERROR : {
            state.errorStatus[action.payload.name] = action.payload.message;
            state.errorStatus[HAS_ERROR] = true;
            return Object.assign({}, state);
        }
        case REMOVE_USER_FORM_ERROR : {
            state.errorStatus[action.payload.name] = "";
            state.errorStatus[HAS_ERROR] = checkErrorStatus(state.errorStatus);
            return Object.assign({}, state);
        }
        case UPDATE_NEW_USER : {
            state.newUser[action.payload.name] = action.payload.value;
            return Object.assign({}, state);
        }
    }
    return state;
};

function checkErrorStatus(errorStatus) {
    let keys = [USERNAME, LAST_NAME, FIRST_NAME, RETRY_PASSWORD, PASSWORD];
    for (let key of keys) {
        if (errorStatus[key] !== "") {
            return true;
        }
    }
    return false;
}

export default generalReducer;