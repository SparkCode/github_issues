import { createSelector } from 'reselect';

export const selectUserRepositories = createSelector(
  state => state.getIn(['issuesSearch', 'repositories']),
  value => value.toJS(),
);

export const selectIssuesCountOptions = createSelector(
  state => state.getIn(['issuesSearch', 'issuesCountOptions']),
  value => value.toJS(),
);

export const selectDefaultIssuesCountOption = createSelector(
  state => state.getIn(['issuesSearch', 'defaultIssuesCountOption']),
  value => value,
);
