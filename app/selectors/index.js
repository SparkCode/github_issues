import { createSelector } from 'reselect';

export const selectHomepage = createSelector(state => state.get('home'), value => value.toJS());

export const selectIssues = createSelector(state => state.getIn(['home', 'issues']), value => value.toJS());

export const selectIssuesData = createSelector(state => state.getIn(['home', 'issues', 'data']), value => value.toJS());

export const selectIsNoIssuesReceived = createSelector(
  state => state.getIn(['home', 'issues', 'didInvalidate']),
  state => state.getIn(['home', 'issues', 'isFetching']),
  state => state.getIn(['home', 'issues', 'data']),
  (didInvalidate, isFetching, data) => !didInvalidate && !isFetching && data.size === 0,
);

export const selectIssue = createSelector(
  (state, issueNumber) => state.getIn(['home', 'issues', 'data']).find(issue => issue.get('number') === issueNumber),
  value => value && value.toJS(),
);

export const selectIsIssuesSuccessfullyBeLoaded = createSelector(
  selectIssues,
  ({ didInvalidate, isFetching, isRequestFailed }) => !didInvalidate && !isFetching && !isRequestFailed,
);

export const selectIssuesCountOptions = createSelector(
  state => state.getIn(['home', 'issues', 'paging', 'issuesCountOptions']),
  value => value.toJS(),
);

export const selectDefaultIssuesCountOption = createSelector(
  state => state.getIn(['home', 'issues', 'paging', 'defaultIssuesCountOption']),
  value => value,
);

export const selectIssuesPagesCount = createSelector(
  state => state.getIn(['home', 'issues', 'paging', 'issuesPagesCount']),
  value => value,
);
export const selectUserRepositories = createSelector(
  state => state.getIn(['home', 'userRepositories']),
  value => value.toJS(),
);
