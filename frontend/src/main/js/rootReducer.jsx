import {combineReducers} from 'redux'
import generalReducer from './components/root/generalReducer.jsx'
import {createUserReducer} from "./components/userForm/userFormReducer";
import userListReducer from "./components/usersList/userListReducer";

const rootReducer = combineReducers({
    generalReducer, createUserReducer, userListReducer
});

export default rootReducer;