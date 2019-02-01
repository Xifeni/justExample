import axios from "axios";
import {
    SET_ACTIVE_AREA,
    SET_CURRENT_USER,
    ADD_USERS,
    USERNAME,
    ADMIN,
    RPC_TESTER,
    NOT_ADMIN,
    USER_LIST,
} from "../const.js";

//todo: класс Actions разрося, надо бы разбить

export let setActiveArea = function (idArea) {
    return {
        type: SET_ACTIVE_AREA,
        payload: idArea
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

export function logout() {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER]+'.logout').then(() => {
            window.location.reload();
        }).catch(() => {
            window.location.reload();
        })
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



export function deleteUser(username) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.deleteUser', username).then(() => {
                dispatch(setActiveArea(USER_LIST));
                dispatch(getUsers())
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