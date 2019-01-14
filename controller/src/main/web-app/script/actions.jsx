let addPhone = function (phone) {
    return {
        type: "ADD_PHONE",
        phone
    }
};
let deletePhone = function (phone) {
    return {
        type: "DELETE_PHONE",
        phone
    }
};

module.exports = {addPhone, deletePhone};