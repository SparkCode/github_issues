import { Route } from 'react-router-dom';
import React from 'react';
import IssuesSearch from 'containers/IssuesSearch/Loadable';
import IssuesList from 'containers/IssuesList/Loadable';
import IssueDetail from 'containers/IssueDetail/Loadable';

export default () => [
  <Route key="empty-search" exact path="/github-issues" component={IssuesSearch} />,
  <Route key="search" path="/github-issues/:userName/:repoName" component={IssuesSearch} />,
  <Route key="issues" exact path="/github-issues/:userName/:repoName" component={IssuesList} />,
  <Route key="issue" exact path="/github-issues/:userName/:repoName/:issueNumber" component={IssueDetail} />,
];
