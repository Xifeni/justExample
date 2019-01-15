import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer.jsx";
import AppView from "./appview.jsx";
import "./bootstrap.css"

let store = createStore(reducer);

store.dispatch({
    type: "SET_STATE",
    buttons: [{text: '1'}, {text: '2'}],
    users: [{name: 'user1', role: 'role1'}, {name: 'user2', role: 'role2'}, {name: 'user3', role: 'role3'}]
});

ReactDOM.render(
    <Provider store={store}>
        <AppView/>
    </Provider>,
    document.getElementById("container")
);