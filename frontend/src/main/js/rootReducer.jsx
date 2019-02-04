import {combineReducers} from 'redux'
import generalReducer from './reducers/generalReducer.jsx'
import {createUserReducer} from "./components/userForm/userFormReducer";

const rootReducer = combineReducers({
    generalReducer, createUserReducer
});

export default rootReducer;