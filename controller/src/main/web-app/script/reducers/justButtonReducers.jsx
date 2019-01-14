let map = require("immutable").Map;

let reducer = function (state = map(), action) {
    switch (action.type) {
        case "JUST_BUTTON_WAS_CLICK":
            return state.update("buttons", (buttons) => buttons.push(action.button));
        case "SET_STATE":
            return state.merge(action.state);
    }
    return state;

};

export default reducer;