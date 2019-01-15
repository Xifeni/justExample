let sayHello = function (button) {
    return {
        type: "GREETING",
        button
    }
};

export default {sayHello};