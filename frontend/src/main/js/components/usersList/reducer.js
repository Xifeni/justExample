import {ADD_USERS, DELETE_USER} from "../../const";

let initialState = {
    users: [],
    loadingStatus: false
};

let userListReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_USERS: {
            return Object.assign({}, state, {users: action.payload, loadingStatus: true});
        }
        case DELETE_USER: {
            let index = state.users.indexOf(action.payload);
            state.users.splice(index, 1);
            return Object.assign({}, state);
        }
    }
    return state;
};

export default userListReducer;