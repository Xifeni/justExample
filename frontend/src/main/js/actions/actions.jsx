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
    RPC_TESTER
} from "../container/const.js";

//todo: класс Actions разрося, надо бы разбить

export let setActiveArea = function (idArea) {
    return {
        type: SET_ACTIVE_AREA,
        payload: idArea
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

//todo: валидация начинает работать только со второго символа. Те если символ один и неправильный - валидация вернет true
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
        axiosWrapper('rpcTester.logout').then((result) => {
            window.location.reload();
        }).catch((onrejected) => {
            window.location.reload();
        })
    }
}

export function passwordValidation(user) {
    return function (dispatch) {
        let pass1 = user[PASSWORD];
        let pass2 = user[RETRY_PASSWORD];
        if (pass1 === pass2) {
            return 'success';
        } else {
            return 'error';
        }
    }
}

export function getUsers() {
    return function (dispatch) {
        axiosWrapper(RPC_TESTER + '.getUsers').then((result) => {
            let users = [];
            result.map(user => users.push({name: user.userName, role: user.firstName}));
            dispatch(addUsers(users));
        }).catch((onrejected) => {
        })
    }
}

export function goToEditUser(userName) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.getUser', userName).then((result) => {
            let presetUser = {
                [USERNAME]: result.userName,
                [ADMIN]: "",
                [FIRST_NAME]: result.firstName,
                [LAST_NAME]: result.lastName
            };
            dispatch(createPresetUser(presetUser));
        }).catch();
    }
}


export function getPermission() {
    return function (dispatch) {
        let isAdmin = false;
        let name = document.getElementById('container').getAttribute("data-username");
        axiosWrapper([RPC_TESTER] + '.getPermission', name).then((result) => {
            if (result === "111") {
                isAdmin = true;
            }
            dispatch(setCurrentUser({
                [USERNAME]: name,
                [ADMIN]: isAdmin
            }));
        });
    }
};

export function sendForm(user) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.saveEditedUser', user).then().catch();
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