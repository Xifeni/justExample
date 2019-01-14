import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'

import {Provider} from 'react-redux';
import reducer from "./script/reducers/justButtonReducers.jsx";
import AppView from './script/views/justButton.jsx';
import {clickButton} from "./script/action/justButtonAction.jsx";

let store = createStore(reducer);

store.dispatch({
    type: "SET_STATE",
    state: {
        buttons: ["1", "2"]
    }
});

console.log(store.getState());
store.dispatch(clickButton(document.getElementById('1')));

ReactDOM.render(
    <Provider store={store}>
        <AppView/>
    </Provider>,
    document.getElementById("container")
);