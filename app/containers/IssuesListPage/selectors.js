import { createSelector } from 'reselect';

export const selectIssues = createSelector(state => state.get('issuesListPage'), value => value.toJS());

export const selectIssuesData = createSelector(state => state.getIn(['issuesListPage', 'data']), value => value.toJS());

export const selectDidIssuesInvalidate = state => state.getIn(['issuesListPage', 'didInvalidate']);

export const selectIsNoIssuesReceived = createSelector(
  selectDidIssuesInvalidate,
  state => state.getIn(['issuesListPage', 'isFetching']),
  state => state.getIn(['issuesListPage', 'data']),
  (didInvalidate, isFetching, data) => !didInvalidate && !isFetching && data.size === 0,
);

export const selectIsIssuesSuccessfullyBeLoaded = createSelector(
  selectIssues,
  ({ didInvalidate, isFetching, isRequestFailed }) => !didInvalidate && !isFetching && !isRequestFailed,
);

export const selectIssuesPagesCount = createSelector(
  state => state.getIn(['issuesListPage', 'issuesPagesCount']),
  value => value,
);
