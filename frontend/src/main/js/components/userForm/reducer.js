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
    SET_OLD_EDITABLE_USERNAME,
    OLD_EDITABLE_USERNAME,
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
    [OLD_EDITABLE_USERNAME]: ""
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
                    [OLD_EDITABLE_USERNAME]: "",
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
            SET_OLD_EDITABLE_USERNAME: {
                return {...state, [OLD_EDITABLE_USERNAME]: payload}
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
    return (/^[a-zA-Z0-9]+$/.test(value)) ? "" : LANG_WARN;
}

