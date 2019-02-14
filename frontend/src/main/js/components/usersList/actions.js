import {
    ADD_USERS,
    ADMIN,
    CREATE_USER,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    RETRY_PASSWORD,
    RPC_TESTER,
    SET_PRESET_USER,
    SET_OLD_EDITABLE_USERNAME,
    USER_LIST,
    USERNAME
} from "../../const.js";
import {setActiveArea} from "../root/actions.js";
import axios from "axios";

export function goToEditUser(userName) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.getUser', userName).then((data) => {
            let result = data.result;
            let presetUser = {
                [USERNAME]: result.userName,
                [ADMIN]: result.role === '111' ? ADMIN : NOT_ADMIN,
                [FIRST_NAME]: result.firstName,
                [LAST_NAME]: result.lastName
            };
            dispatch(setUserSignature(result.userName));
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
        [USERNAME]: {value: presetUser[USERNAME], error: []},
        [PASSWORD]: {value: "", error: []},
        [RETRY_PASSWORD]: {value: "", error: []},
        [FIRST_NAME]: {value: presetUser[FIRST_NAME], error: []},
        [LAST_NAME]: {value: presetUser[LAST_NAME], error: []},
        [ADMIN]: {value: presetUser[ADMIN], error: []}
    };
    return {
        type: SET_PRESET_USER,
        payload: result
    }
}

function setUserSignature(username) {
    return {
        type: SET_OLD_EDITABLE_USERNAME,
        payload: username
    }
}

export function deleteUser(user) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.deleteUser', user[USERNAME]).then(() => {
                dispatch(setActiveArea(USER_LIST));
                dispatch(getUsers())
            }
        ).catch((onrejected) => {
                alert("Has error:" + onrejected);
            }
        );
    }
}

export function getUsers() {
    return function (dispatch) {
        axiosWrapper(RPC_TESTER + '.getUsers').then((data) => {
            let users = [];
            let result = data.result;
            result.map(user => users.push({
                [USERNAME]: user.userName,
                [FIRST_NAME]: user.firstName,
                [LAST_NAME]: user.lastName}));
            dispatch(addUsers(users));
        }).catch((onrejected) => {
            alert("has error" + onrejected);
        })
    }
}

let addUsers = function (users) {
    return {
        type: ADD_USERS,
        payload: users
    }
};

function axiosWrapper(className, ...methodParams) {
    return axios.post("JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}
