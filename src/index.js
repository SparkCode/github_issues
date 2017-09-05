import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.css'
import {Provider} from "react-redux";
import store from "./store";
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory, Route, Router} from "react-router";
import HomePage from "./containers/HomePage/HomePage";
import IssueDetailPage from "./containers/IssueDetailPage/IssueDetailPage";

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={HomePage}>
                <Route path=":userName/:repoName/issues" component={HomePage}/>
            </Route>
            <Route path=":userName/:repoName/issues/:issueNumber" component={IssueDetailPage}/>
        </Router>
    </Provider>,
    document.getElementById('root'));
