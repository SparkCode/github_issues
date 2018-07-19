import React from 'react';
import DefaultValuesContext from './DefaultValuesContext';

const withDefaultValuesContext = Component => props => (
  <DefaultValuesContext.Consumer>
    {({ issuesCountOnPageOptions, defaultIssuesCountOnPageOption }) => (
      <Component
        {...props}
        issuesCountOnPageOptions={issuesCountOnPageOptions}
        defaultIssuesCountOnPageOption={defaultIssuesCountOnPageOption}
      />
    )}
  </DefaultValuesContext.Consumer>
);

export default withDefaultValuesContext;
