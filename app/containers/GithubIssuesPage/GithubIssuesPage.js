import { Route } from 'react-router-dom';
import React from 'react';
import IssuesSearch from 'containers/IssuesSearch/Loadable';
import IssuesList from 'containers/IssuesList/Loadable';
import IssueDetail from 'containers/IssueDetail/Loadable';
import DefaultValuesContext from './DefaultValuesContext';

const preconnectToGithub = () => {
  const preconnectLink = document.createElement('link');
  preconnectLink.rel = 'preconnect';
  preconnectLink.href = 'https://api.github.com';
  preconnectLink.crossOrigin = 'anonymous';
  document.head.appendChild(preconnectLink);
};

export default () => {
  preconnectToGithub();
  return (
    <DefaultValuesContext.Provider
      value={{
        issuesCountOnPageOptions: ['10', '20', '30', '50', '100'],
        defaultIssuesCountOnPageOption: '20',
      }}
    >
      <Route key="empty-search" exact path="/github-issues" component={IssuesSearch} />
      <Route key="search" path="/github-issues/:userName/:repoName" component={IssuesSearch} />
      <Route key="issues" exact path="/github-issues/:userName/:repoName" component={IssuesList} />
      <Route key="issue" exact path="/github-issues/:userName/:repoName/:issueNumber" component={IssueDetail} />
    </DefaultValuesContext.Provider>
  );
};
