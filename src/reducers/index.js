import {combineReducers} from "redux";
import issues from "./issues";
import {routerReducer} from "react-router-redux"
import userRepositories from "./userRepositories";


const rootReducer = combineReducers(
    {
        issues,
        userRepositories,
        routing: routerReducer
    });

export default rootReducer;