import { createSelector } from 'reselect';

export const selectIssue = createSelector(
  (state, issueNumber) => state.getIn(['home', 'data']).find(issue => issue.get('number') === issueNumber),
  value => value && value.toJS(),
);
