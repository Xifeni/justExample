import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer.jsx'
import {createLogger} from "redux-logger";



export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger, thunk));

    return store;
}