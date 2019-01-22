import axios from "axios";

export let setActiveArea = function (idArea) {
    return {
        type: "SET_ACTIVE_AREA",
        payload: idArea
    }
};


let changePermissions = function (permission) {
    return {
        type: "CHANGE_PERMISSIONS",
        payload: permission
    }
};

export function getPermission() {
    return function (dispatch) {
        axiosWrapper('rpcTester.getPermission', 'test').then((result) => {
            console.log(result);
            dispatch(changePermissions(result));
        })
    }
};

export function getUsers() {
    return function (dispatch) {
        axiosWrapper('rpcTester.getUsers').then((result) => {
            console.log(result);
        }).catch(({error}) => {
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