import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import "../bootstrap.css"

import AppView from "../component/appview.jsx";
import configureStore from "../store/configureStore.js";

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppView/>
    </Provider>,
    document.getElementById("container")
);