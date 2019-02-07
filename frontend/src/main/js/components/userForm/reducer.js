import {
    ADMIN,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    RETRY_PASSWORD,
    UPDATE_NEW_USER,
    USERNAME,
    SET_PRESET_USER,
    WIPE_DATA,
    SET_USER_SIGNATURE,
    USER_SIGNATURE,
    ADD_ERROR,
    VALIDATE_FORM
} from "../../const.js";
import {LANG_WARN} from "../../const";

let initState = {
    newUser: {
        [USERNAME]: {value: "", error: []},
        [PASSWORD]: {value: "", error: []},
        [RETRY_PASSWORD]: {value: "", error: []},
        [FIRST_NAME]: {value: "", error: []},
        [LAST_NAME]: {value: "", error: []},
        [ADMIN]: {value: NOT_ADMIN, error: []},
    },
    [USER_SIGNATURE]: ""
};

export let createUserReducer = function (state = initState, {type, payload}) {
        switch (type) {
            case UPDATE_NEW_USER : {
                return {
                    ...state,
                    newUser: {
                        ...state.newUser,
                        [payload.name]: {value: payload.value, error: [...state.newUser[payload.name].error]}
                    },
                };
            }
            case VALIDATE_FORM: {
                validateForm(state.newUser);
                return {...state, newUser: {...state.newUser}}
            }
            case SET_PRESET_USER:
                return {
                    ...state, newUser: payload
                };
            case
            WIPE_DATA: {
                return {
                    ...state,
                    [USER_SIGNATURE]: "",
                    newUser: {
                        [USERNAME]: {value: "", error: []},
                        [PASSWORD]: {value: "", error: []},
                        [RETRY_PASSWORD]: {value: "", error: []},
                        [FIRST_NAME]: {value: "", error: []},
                        [LAST_NAME]: {value: "", error: []},
                        [ADMIN]: {value: NOT_ADMIN, error: []},
                    },
                }
            }
            case
            SET_USER_SIGNATURE: {
                return {...state, [USER_SIGNATURE]: payload}
            }
            case
            ADD_ERROR: {
                return {
                    ...state,
                    newUser: {
                        ...state.newUser,
                        [payload[0]]: {
                            error: [...state.newUser[payload[0]].error, payload[1]],
                            isValid: false
                        }
                    }
                };
            }
        }
        return state;
    }
;

function validateForm(newUser) {
    for (let param in newUser) {
        let error = simpleValidation(param, newUser[param].value);
        if (error !== "") {
            newUser[param].error[0] = error;
        } else {
            newUser[param].error = [];
        }
    }
}

function simpleValidation(param, value) {
    return (!/[^a-zA-Z1-9]/.test(value)) ? "" : LANG_WARN;
}

