import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import appReducer from '../appReducer.js'
import {createLogger} from "redux-logger";


export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
        appReducer,
        initialState,
        applyMiddleware(logger, thunk));

    return store;
}