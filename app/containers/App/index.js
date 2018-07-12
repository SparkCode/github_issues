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
        <Route path="/" exact render={({ match, location }) => <HomePage match={match} location={location} />} />
        <Route
          path="/:userName/:repoName/issues"
          exact
          render={({ match, location }) => {
            IssuesListPage.preload();
            return (
              <HomePage match={match} location={location}>
                <IssuesListPage match={match} location={location} />
              </HomePage>
            );
          }}
        />
        <Route
          path="/:userName/:repoName/issues/:issueNumber"
          exact
          render={({ match, location }) => {
            IssueDetailPage.preload();
            return (
              <HomePage match={match} location={location}>
                <IssueDetailPage match={match} location={location} />
              </HomePage>
            );
          }}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
