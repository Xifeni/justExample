import {combineReducers} from 'redux'
import rootReducer from './components/root/rootReducer.js'
import {createUserReducer} from "./components/userForm/reducer";
import reducer from "./components/usersList/reducer";

const appReducer = combineReducers({
    generalReducer: rootReducer, createUserReducer, userListReducer: reducer
});

export default appReducer;