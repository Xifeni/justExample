import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import "../../recources/css/bootstrap.css"

import AppView from "./rootContainer.jsx";
import configureStore from "../store/configureStore.js";

export let store = configureStore();

    ReactDOM.render(
        <Provider store={store}>
            <AppView/>
        </Provider>,
        document.getElementById("container")
    );