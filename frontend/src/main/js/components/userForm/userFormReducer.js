import {
    ADMIN,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    PASSWORD_TYPE,
    RETRY_PASSWORD,
    PASSWORD_STATUS,
    TEXT_TYPE,
    VALIDATION_STATUS,
    UPDATE_NEW_USER,
    USERNAME,
    SET_PRESET_USER,
    WIPE_DATA,
    VALIDATION_ARRAY,
    SET_USER_SIGNATURE,
    USER_SIGNATURE
} from "../../const.js";
import {ADD_ERROR, LANG_WARN, PASSWORD_ERROR_MESSAGE} from "../../const";

let initState = {
    newUser: {
        [USERNAME]: {type: TEXT_TYPE, value: ""},
        [PASSWORD]: {type: PASSWORD_TYPE, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, value: ""},
        [LAST_NAME]: {type: TEXT_TYPE, value: ""},
        [ADMIN]: {type: TEXT_TYPE, value: NOT_ADMIN},
    },
    [VALIDATION_ARRAY]: {
        [PASSWORD_STATUS]: {isValid: null, error: [PASSWORD_ERROR_MESSAGE]},
        [VALIDATION_STATUS]: {isValid: null, error: [""]},
        [USERNAME]: {isValid: null, error: [LANG_WARN]},
        [PASSWORD]: {isValid: null, error: [LANG_WARN]},
        [RETRY_PASSWORD]: {isValid: null, error: [LANG_WARN]},
        [FIRST_NAME]: {isValid: null, error: [LANG_WARN]},
        [LAST_NAME]: {isValid: null, error: [LANG_WARN]},
        [ADMIN]: {isValid: true, error: [LANG_WARN]},
    },
    [USER_SIGNATURE]: ""
};

export let createUserReducer = function (state = initState, action) {
    switch (action.type) {
        case UPDATE_NEW_USER : {
            state.newUser[action.payload.name].value = action.payload.value;
            state.VALIDATION_ARRAY[PASSWORD_STATUS].isValid = validatePassword(state.newUser);
            state.VALIDATION_ARRAY[VALIDATION_STATUS].isValid = validateForm(state.newUser, state.VALIDATION_ARRAY);
            return Object.assign({}, state);
        }
        case SET_PRESET_USER:
            state.VALIDATION_ARRAY[PASSWORD_STATUS].isValid = null;
            state.VALIDATION_ARRAY[VALIDATION_STATUS].isValid = null;
            return Object.assign({}, state, {newUser: action.payload});
        case WIPE_DATA: {
            state.VALIDATION_ARRAY[PASSWORD_STATUS].isValid = null;
            state.VALIDATION_ARRAY[VALIDATION_STATUS].isValid = null;
            return Object.assign({}, state, {
                newUser: action.payload,
                [USER_SIGNATURE]: "",
            });
        }
        case SET_USER_SIGNATURE: {
            return Object.assign({}, state, {[USER_SIGNATURE]: action.payload});
        }
        case ADD_ERROR: {
            console.log(action.payload[0]+" : "+action.payload[1]);
            console.log(state.VALIDATION_ARRAY[action.payload[0]]);
            state.VALIDATION_ARRAY[action.payload[0]].error.push(action.payload[1]);
            state.VALIDATION_ARRAY[action.payload[0]].isValid = false;
            return Object.assign({}, state);
        }
    }
    return state;
};

function validateForm(newUser, VALIDATION_ARRAY) {
    let flag = true;
    for (let param in newUser) {
        VALIDATION_ARRAY[param].isValid = simpleValidation(newUser[param].value);
        flag = flag && VALIDATION_ARRAY[param].isValid;
    }
    return flag;
}


function validatePassword(newUser) {
    let pass = [];
    for (let param in newUser) {
        if (newUser[param].type === PASSWORD_TYPE) {
            pass.push(newUser[param]);
        }
    }
    return pass[0].value === pass[1].value;
}

function simpleValidation(value) {
    if (value.length === 0) {
        return null
    }
    return (!/[^a-zA-Z1-9]/.test(value));
}

