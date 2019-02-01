import {combineReducers} from 'redux'
import generalReducer from './generalReducer.jsx'
import {createUserReducer} from "../userForm/userFormReducer";

const rootReducer = combineReducers({
    generalReducer, createUserReducer
});

export default rootReducer;