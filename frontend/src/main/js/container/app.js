import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import "../../styles/bootstrap.css"

import AppView from "./rootContainer.jsx";
import configureStore from "../store/configureStore.js";

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppView/>
    </Provider>,
    document.getElementById("container")
);