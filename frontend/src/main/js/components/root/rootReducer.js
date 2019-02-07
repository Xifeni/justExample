import {
    USER_LIST,
    SET_CURRENT_USER,
    SET_ACTIVE_AREA,
    USERNAME,
    ADMIN,
} from "../../const.js";

let initialState = {
    activeArea: USER_LIST,
    currentUser: {
        [USERNAME]: "",
        [ADMIN]: ""
    },
};

let rootReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_AREA : {
            return Object.assign({}, state, {activeArea: action.payload});
        }
        case SET_CURRENT_USER: {
            return Object.assign({}, state, {
                currentUser: {
                    [USERNAME]: action.payload[USERNAME],
                    [ADMIN]: action.payload[ADMIN]
                }
            })
        }
    }
    return state;
};

export default rootReducer;