import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index";
import {browserHistory} from "react-router";
import {routerMiddleware} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(rootReducer,
composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory))));

export default store;