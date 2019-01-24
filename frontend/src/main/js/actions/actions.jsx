import axios from "axios";
import {SET_USER_FORM_ERROR, SET_ACTIVE_AREA, CHANGE_PERMISSIONS, ADD_USERS, REMOVE_USER_FORM_ERROR} from "../container/const.js";

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

let setError = function () {
    return {
        type: SET_USER_FORM_ERROR
    }
};

let remoweError = function () {
    return {
        type: REMOVE_USER_FORM_ERROR
    }
};

export function simpleValidation(text) {
    return function (dispatch) {
        console.log("simpleValidation");
        if ((/[^a-zA-Z1-9]/.test(text))) {
            dispatch(setError());
            return 'error';
        } else {
            dispatch(remoweError());
            return 'success';
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

function axiosWrapper(className, ...methodParams) {
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => data.result);
}