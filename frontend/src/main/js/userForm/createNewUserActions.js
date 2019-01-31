import {
    ADMIN, CREATE_USER,
    FIRST_NAME,
    LAST_NAME, NOT_ADMIN, PASSWORD,
    PASSWORD_TYPE, RETRY_PASSWORD,
    RPC_TESTER, SET_PRESET_USER,
    TEXT_TYPE,
    UPDATE_NEW_USER,
    USERNAME, WIPE_DATA
} from "../const";
import axios from "axios";
import {setActiveArea} from "../actions/actions.jsx";
import {USER_LIST} from "../const";

export function sendParam(param) {
    return function (dispatch) {
        dispatch(updateNewUser(param.name, param.value));
    }
}

let updateNewUser = function (name, value) {
    return {
        type: UPDATE_NEW_USER,
        payload: {name: name, value: value}
    }
};

export function goToEditUser(userName) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.getUser', userName).then((data) => {
            let result = data.result;
            let presetUser = {
                [USERNAME]: result.userName,
                [ADMIN]: "",
                [FIRST_NAME]: result.firstName,
                [LAST_NAME]: result.lastName
            };
            dispatch(setPresetUser(presetUser));
            dispatch(setActiveArea(CREATE_USER));
        }).catch(
            (onrejected) => {
                alert("has error" + onrejected);
            }
        );
    }
}

function setPresetUser(presetUser) {
    let result = {
        [USERNAME]: {type: TEXT_TYPE, validationState: true, value: presetUser[USERNAME]},
        [PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, validationState: true, value: presetUser[FIRST_NAME]},
        [LAST_NAME]: {type: TEXT_TYPE, validationState: true, value: presetUser[LAST_NAME]},
        [ADMIN]: {type: TEXT_TYPE, validationState: null, value: NOT_ADMIN}
    };
    return {
        type: SET_PRESET_USER,
        payload: result
    }
}

export function clearErrorStatus() {
    let result = {
        [USERNAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [LAST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [ADMIN]: {type: TEXT_TYPE, validationState: null, value: NOT_ADMIN}
    };

    return {
        type: WIPE_DATA,
        payload: result
    }
}

export function sendForm(user, signatureUser) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.saveEditedUser', user, signatureUser).then((data) => {
                if (data.error.msg === undefined) {
                    dispatch(setActiveArea(USER_LIST));
                } else {
                    alert("Has error " + data.error.msg);
                }
            }
        ).catch((onrejected) => {
                alert("Has error:" + onrejected);
            }
        );
    }
}

function axiosWrapper(className, ...methodParams) {
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}
