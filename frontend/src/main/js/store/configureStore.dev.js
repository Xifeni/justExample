import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import appReducer from '../appReducer.js'
import {createLogger} from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
        appReducer,
        initialState,
        composeEnhancers(applyMiddleware(logger, thunk)));

    return store;
}