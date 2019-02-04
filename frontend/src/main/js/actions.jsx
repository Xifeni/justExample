import axios from "axios";
import {
    SET_ACTIVE_AREA,
    SET_CURRENT_USER,
    USERNAME,
    ADMIN,
    RPC_TESTER,
    NOT_ADMIN,
} from "./const.js";

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

export function logout(currentUser) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER]+'.logout', currentUser).then(() => {
            window.location.reload();
        }).catch(() => {
            window.location.reload();
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

function axiosWrapper(className, ...methodParams) {
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}