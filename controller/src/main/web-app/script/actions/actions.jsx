let sayHello = function (button) {
    return {
        type: "GREETING_AND_DELETE",
        button
    }
};

export default {sayHello};