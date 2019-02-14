import {
    ADD_ERROR,
    ADMIN,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    RETRY_PASSWORD,
    RPC_TESTER,
    UPDATE_NEW_USER,
    USER_LIST,
    USERNAME,
    VALIDATE_FORM,
    WIPE_DATA
} from "../../const";
import axios from "axios";
import {setActiveArea} from "../root/actions.js";
import {getUsers} from "../usersList/actions";

export function sendParam(param) {
    return function (dispatch) {
        dispatch(updateNewUser(param.name, param.value));
        dispatch(validateForm());
    }
}

let validateForm = function () {
    return {
        type: VALIDATE_FORM
    }
};

let updateNewUser = function (name, value) {
    return {
        type: UPDATE_NEW_USER,
        payload: {name: name, value: value}
    }
};

function getUser(user, oldEditableUsername) {
    return {
        [USERNAME]: user[USERNAME].value,
        [PASSWORD]: user[PASSWORD].value,
        [FIRST_NAME]: user[FIRST_NAME].value,
        [LAST_NAME]: user[LAST_NAME].value,
        [ADMIN]: user[ADMIN].value,
        oldEditableUsername: oldEditableUsername
    };
}

export function saveNewUser(user, oldEditableUsername) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.saveNewUser', getUser(user, oldEditableUsername)).then((data) => {
                if (data.error === undefined) {
                    dispatch(wipeData());
                    dispatch(getUsers());
                    dispatch(setActiveArea(USER_LIST));
                } else {
                    let errors = data.error.msg.split(',');
                    if (errors.length === 2) {
                        dispatch(addError(errors));
                    } else {
                        alert("Has error:" + errors);
                    }
                }
            }
        ).catch((onrejected) => {
                alert("Has error:" + onrejected);
            }
        );
    }
}

export function saveEditedUser(user, oldEditableUsername) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.saveEditedUser', getUser(user, oldEditableUsername)).then((data) => {
                if (data.error === undefined) {
                    dispatch(wipeData());
                    dispatch(getUsers());
                    dispatch(setActiveArea(USER_LIST));
                } else {
                    dispatch(addError(data.error.msg.split(',')));
                }
            }
        ).catch((onrejected) => {
                alert("Has error:" + onrejected);
            }
        );
    }
}

export function wipeData() {
    let result = {
        [USERNAME]: {value: "", error: []},
        [PASSWORD]: {value: "", error: []},
        [RETRY_PASSWORD]: {value: "", error: []},
        [FIRST_NAME]: {value: "", error: []},
        [LAST_NAME]: {value: "", error: []},
        [ADMIN]: {value: NOT_ADMIN, error: []}
    };
    return {
        type: WIPE_DATA,
        payload: result
    }
}

export function addError(error) {
    return {
        type: ADD_ERROR,
        payload: error
    }
}

function axiosWrapper(className, ...methodParams) {
    return axios.post("JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}
