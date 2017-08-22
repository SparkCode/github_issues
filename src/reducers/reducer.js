import {combineReducers} from "redux";
import issues from "./issues";
import {routerReducer} from "react-router-redux"


const rootReducer = combineReducers({issues, routing: routerReducer});

export default rootReducer;