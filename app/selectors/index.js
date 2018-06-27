import { createSelector } from 'reselect';

export const selectHomepage = createSelector(
  state => state.get('home'),
  value => value.toJS(),
);

export const selectIssues = createSelector(
  state => state.getIn(['home', 'issues']),
  value => value.toJS(),
);

export const selectIssuesData = createSelector(
  state => state.getIn(['home', 'issues', 'data']),
  value => value.toJS(),
);

export const selectIssue = createSelector(
  (state, issueNumber) =>
    state
      .getIn(['home', 'issues', 'data'])
      .find(issue => issue.get('number') === issueNumber),
  value => value && value.toJS(),
);

export const selectPaging = createSelector(
  state => state.getIn(['home', 'issues', 'paging']),
  value => value.toJS(),
);

export const selectIssuesPagesCount = createSelector(
  state => state.getIn(['home', 'issues', 'paging', 'issuesPagesCount']),
  value => value,
);
export const selectUserRepositories = createSelector(
  state => state.getIn(['home', 'userRepositories']),
  value => value.toJS(),
);
