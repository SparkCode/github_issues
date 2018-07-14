import { createSelector } from 'reselect';

export const selectUserRepositories = createSelector(
  state => state.getIn(['issuesSearch', 'repositories']),
  value => value.toJS(),
);

export const selectIssuesCountOnPageOptions = createSelector(
  state => state.getIn(['issuesSearch', 'issuesCountOnPageOptions']),
  value => value.toJS(),
);

export const selectDefaultIssuesCountOnPageOption = createSelector(
  state => state.getIn(['issuesSearch', 'defaultIssuesCountOnPageOption']),
  value => value,
);
