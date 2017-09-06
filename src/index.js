import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.css'
import {Provider} from "react-redux";
import store from "./store";
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import IssuesListPage from "./containers/IssuesListPage";
import IssueDetailPage from "./containers/IssueDetailPage";
import HomePage from "./containers/HomePage";

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={HomePage}>
                <IndexRoute component={IssuesListPage}/>
                <Route path=":userName/:repoName/issues" component={IssuesListPage}/>
                <Route path=":userName/:repoName/issues/:issueNumber" component={IssueDetailPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'));
