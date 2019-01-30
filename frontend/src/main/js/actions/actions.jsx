import axios from "axios";
import {
    SET_USER_FORM_ERROR,
    SET_ACTIVE_AREA,
    SET_ACTIVE_AREA_EDIT,
    SET_CURRENT_USER,
    ADD_USERS,
    REMOVE_USER_FORM_ERROR,
    UPDATE_NEW_USER,
    PASSWORD,
    RETRY_PASSWORD,
    USERNAME,
    FIRST_NAME,
    LAST_NAME,
    ADMIN,
    RPC_TESTER,
    WIPE_DATA,
    DELETE_USER,
    CHANGE_PASSWORD_STATUS,
    NOT_ADMIN,
    USER_LIST
} from "../container/const.js";

//todo: класс Actions разрося, надо бы разбить

export let setActiveArea = function (idArea) {
    return {
        type: SET_ACTIVE_AREA,
        payload: idArea
    }
};

let setPasswordCheckStatus = function (flag) {
    return {
        type: CHANGE_PASSWORD_STATUS,
        payload: flag
    }
};

let createPresetUser = function (savedUser) {
    return {
        type: SET_ACTIVE_AREA_EDIT,
        payload: savedUser
    }
};

let setCurrentUser = function (currentUser) {
    return {
        type: SET_CURRENT_USER,
        payload: currentUser
    }
};

let addUsers = function (users) {
    return {
        type: ADD_USERS,
        payload: users
    }
};

let setError = function (ref) {
    return {
        type: SET_USER_FORM_ERROR,
        payload: {name: ref.id, message: ref.value}
    }
};

let removeError = function (ref) {
    return {
        type: REMOVE_USER_FORM_ERROR,
        payload: {name: ref.id, message: ref.value}
    }
};

let updateNewUser = function (name, value) {
    return {
        type: UPDATE_NEW_USER,
        payload: {name: name, value: value}
    }
};

let deleteUserInState = function (username) {
    return {
        type: DELETE_USER,
        payload: username
    }
};

export function simpleValidation(ref) {
    return function (dispatch) {
        if ((/[^a-zA-Z1-9]/.test(ref.value))) {
            dispatch(setError(ref));
            return 'error';
        } else {
            dispatch(removeError(ref));
            return 'success';
        }
    }
}

export function logout() {
    return function (dispatch) {
        axiosWrapper('rpcTester.logout').then(() => {
            window.location.reload();
        }).catch(() => {
            window.location.reload();
        })
    }
}

export function passwordValidation(user) {
    return function (dispatch) {
        let pass1 = user[PASSWORD];
        let pass2 = user[RETRY_PASSWORD];
        let flag = true;
        console.log("try validate password:" + pass1 + ":" + pass2);
        if (pass1 === pass2 && pass1.length !== 0) {
            flag = false;
        }
        return dispatch(setPasswordCheckStatus(flag));
    }
}

export function getUsers() {
    return function (dispatch) {
        axiosWrapper(RPC_TESTER + '.getUsers').then((data) => {
            let users = [];
            let result = data.result;
            result.map(user => users.push(user.userName));
            dispatch(addUsers(users));
        }).catch((onrejected) => {
            alert("has error" + onrejected);
        })
    }
}

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
            dispatch(createPresetUser(presetUser));
        }).catch(
            (onrejected) => {
                alert("has error" + onrejected);
            }
        );
    }
}


export function getPermission() {
    return function (dispatch) {
        let isAdmin = NOT_ADMIN;
        let name = document.getElementById('container').getAttribute("data-username");
        axiosWrapper([RPC_TESTER] + '.getPermission', name).then((data) => {
            let result = data.result;
            if (result === "111") {
                isAdmin = ADMIN;
            }
            dispatch(setCurrentUser({
                [USERNAME]: name,
                [ADMIN]: isAdmin
            }));
        });
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

export function sendParam(ref) {
    return function (dispatch) {
        dispatch(updateNewUser(ref.id, ref.value));
    }
}

export function clearErrorStatus() {
    return {
        type: WIPE_DATA
    }
}

export function deleteUser(username) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.deleteUser', username).then(() => {
                dispatch(deleteUserInState(username));
                dispatch(setActiveArea(USER_LIST));
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