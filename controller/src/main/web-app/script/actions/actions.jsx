let sayHello = function (button) {
    return {
        type: "GREETING_AND_DELETE",
        button
    }
};

let setActiveArea = function (idArea) {
    return {
        type: "SET_ACTIVE_AREA",
        idArea
    }
};


export default {sayHello, setActiveArea};