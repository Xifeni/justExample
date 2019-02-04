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

let initState = {
    newUser: {
        [USERNAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [LAST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [ADMIN]: {type: TEXT_TYPE, validationState: null, value: NOT_ADMIN},
    },
    [VALIDATION_ARRAY]: [
        {name: [USERNAME], value: null},
        {name: [PASSWORD], value: null},
        {name: [RETRY_PASSWORD], value: null},
        {name: [FIRST_NAME], value: null},
        {name: [FIRST_NAME], value: null},
        {name: [LAST_NAME], value: null}
    ],
    [PASSWORD_STATUS]: null,
    [VALIDATION_STATUS]: null,
    [USER_SIGNATURE]: ""
};

export let createUserReducer = function (state = initState, action) {
    switch (action.type) {
        case UPDATE_NEW_USER : {
            state.newUser[action.payload.name].value = action.payload.value;

            return Object.assign({}, state, {
                [PASSWORD_STATUS]: validatePassword(state.newUser),
                [VALIDATION_STATUS]: validateForm(state.newUser)
            });
        }
        case SET_PRESET_USER:
            return Object.assign({}, state, {
                newUser: action.payload,
                [VALIDATION_STATUS]: null,
                [PASSWORD_STATUS]: null
            });
        case WIPE_DATA: {
            return Object.assign({}, state, {
                newUser: action.payload,
                [USER_SIGNATURE]: "",
                [VALIDATION_STATUS]: null,
                [PASSWORD_STATUS]: null
            });
        }
        case SET_USER_SIGNATURE: {
            return Object.assign({}, state, {[USER_SIGNATURE]: action.payload});
        }
    }
    return state;
};

function validateForm(newUser) {
    let flag = true;
    for (let param in newUser) {
        newUser[param].validationState = simpleValidation(newUser[param].value);
        flag = flag && newUser[param].validationState;
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

