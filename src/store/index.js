import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index";
import {browserHistory} from "react-router";
import {routerMiddleware} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';

const store = createStore(rootReducer,
composeWithDevTools(applyMiddleware(createDebounce(),thunk, routerMiddleware(browserHistory))));

export default store;