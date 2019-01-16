import {combineReducers} from 'redux'
import buttonReducer from './buttonReducer.jsx'

/*const rootReducer = combineReducers({
    buttonReducer
});*/

const rootReducer = buttonReducer;

export default rootReducer;