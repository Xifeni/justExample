import {
    ADD_USERS,
    ADMIN,
    CREATE_USER,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    PASSWORD_TYPE,
    RETRY_PASSWORD,
    RPC_TESTER,
    SET_PRESET_USER,
    SET_USER_SIGNATURE,
    TEXT_TYPE,
    USER_LIST,
    USERNAME
} from "../../const.js";
import {setActiveArea} from "../root/actions.js";
import axios from "axios";

export function goToEditUser(userName, signature) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.getUser', userName, signature).then((data) => {
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
        [USERNAME]: {type: TEXT_TYPE, value: presetUser[USERNAME]},
        [PASSWORD]: {type: PASSWORD_TYPE, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, value: presetUser[FIRST_NAME]},
        [LAST_NAME]: {type: TEXT_TYPE, value: presetUser[LAST_NAME]},
        [ADMIN]: {type: TEXT_TYPE, value: presetUser[ADMIN]}
    };
    return {
        type: SET_PRESET_USER,
        payload: result
    }
}

function setUserSignature(username) {
    return {
        type: SET_USER_SIGNATURE,
        payload: username
    }
}

export function deleteUser(username, signature) {
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.deleteUser', username, signature).then(() => {
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
            result.map(user => users.push(user.userName));
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
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}
