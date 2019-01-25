import {combineReducers} from 'redux'
import generalReducer from './generalReducer.jsx'

/*const rootReducer = combineReducers({
    generalReducer
});*/

const rootReducer = generalReducer;

export default rootReducer;