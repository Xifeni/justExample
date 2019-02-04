import {
    ADMIN,
    FIRST_NAME,
    LAST_NAME,
    NOT_ADMIN,
    PASSWORD,
    PASSWORD_TYPE,
    RETRY_PASSWORD,
    RPC_TESTER,
    TEXT_TYPE,
    UPDATE_NEW_USER,
    USERNAME,
    WIPE_DATA,
    USER_LIST
} from "../../const.js";
import axios from "axios";
import {setActiveArea} from "../../actions.jsx";

export function sendParam(param) {
    return function (dispatch) {
        dispatch(updateNewUser(param.name, param.value));
    }
}

let updateNewUser = function (name, value) {
    return {
        type: UPDATE_NEW_USER,
        payload: {name: name, value: value}
    }
};

export function wipeData() {
    let result = {
        [USERNAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [RETRY_PASSWORD]: {type: PASSWORD_TYPE, validationState: null, value: ""},
        [FIRST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [LAST_NAME]: {type: TEXT_TYPE, validationState: null, value: ""},
        [ADMIN]: {type: TEXT_TYPE, validationState: null, value: NOT_ADMIN}
    };

    return {
        type: WIPE_DATA,
        payload: result
    }
}

export function sendForm(user, signatureUser, currentUser) {
    let result = {
        [USERNAME]: user[USERNAME].value,
        [PASSWORD]: user[PASSWORD].value,
        [RETRY_PASSWORD]: user[RETRY_PASSWORD].value,
        [FIRST_NAME]: user[FIRST_NAME].value,
        [LAST_NAME]: user[LAST_NAME].value,
        [ADMIN]: user[ADMIN].value,
        signatureUser: signatureUser
    };
    return function (dispatch) {
        axiosWrapper([RPC_TESTER] + '.saveUser', result, currentUser).then((data) => {
                if (data.error === undefined) {
                    dispatch(wipeData());
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

function axiosWrapper(className, ...methodParams) {
    return axios.post("/JSON-RPC", JSON.stringify({
        method: className,
        params: methodParams
    })).then(({data}) => (data));
}
