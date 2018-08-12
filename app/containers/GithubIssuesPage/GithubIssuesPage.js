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
      <Route exact path="/" component={IssuesSearch} />
      <Route path="/:userName/:repoName" component={IssuesSearch} />
      <Route exact path="/:userName/:repoName" component={IssuesList} />
      <Route exact path="/:userName/:repoName/:issueNumber" component={IssueDetail} />
    </DefaultValuesContext.Provider>
  );
};
