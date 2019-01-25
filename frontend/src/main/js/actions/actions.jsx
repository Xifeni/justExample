import axios from "axios";
import {
    SET_USER_FORM_ERROR,
    SET_ACTIVE_AREA,
    CHANGE_PERMISSIONS,
    ADD_USERS,
    REMOVE_USER_FORM_ERROR,
    UPDATE_NEW_USER,
    PASSWORD,
    RETRY_PASSWORD
} from "../container/const.js";

export let setActiveArea = function (idArea) {
    return {
        type: SET_ACTIVE_AREA,
        payload: idArea
    }
};


let changePermissions = function (permission) {
    return {
        type: CHANGE_PERMISSIONS,
        payload: permission
    }
};

export function getPermission() {
    return function (dispatch) {
        axiosWrapper('rpcTester.getPermission', 'test').then((result) => {
            dispatch(changePermissions(result));
        })
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

export function passwordValidation(user) {
    return function (dispatch) {
        let pass1 = user[PASSWORD];
        let pass2 = user[RETRY_PASSWORD];
        console.log("pass1=" + pass1 + " pass2=" + pass2);
        if (pass1 === pass2) {
            return 'success';
        } else {
            return 'error';
        }
    }
}

export function getUsers() {
    return function (dispatch) {
        axiosWrapper('rpcTester.getUsers').then((result) => {
            let users = [];
            result.map(user => users.push({name: user.userName, role: user.firstName}));
            dispatch(addUsers(users));
        }).catch((error) => {
            console.log("error get users" + error);
        })
    }
}


export function sendForm(state) {
    return function (dispatch) {

    }
}


export function sendParam(ref) {
    return function (dispatch) {
        dispatch(updateNewUser(ref.id, ref.value));
    }
}

function axiosWrapper(className, ...methodParams) {
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => data.result);
}