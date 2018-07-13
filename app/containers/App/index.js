/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import IssuesListPage from 'containers/IssuesListPage/Loadable';
import IssueDetailPage from 'containers/IssueDetailPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={({ match, location }) => (
            <HomePage match={match} location={location}>
              <Route exact path="/:userName/:repoName/issues" component={IssuesListPage} />
              <Route exact path="/:userName/:repoName/issues/:issueNumber" component={IssueDetailPage} />
            </HomePage>
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
