import { createSelector } from 'reselect';

export const selectIssues = createSelector(state => state.get('home'), value => value.toJS());

export const selectIssuesData = createSelector(state => state.getIn(['home', 'data']), value => value.toJS());

export const selectDidIssuesInvalidate = state => state.getIn(['home', 'didInvalidate']);

export const selectIsNoIssuesReceived = createSelector(
  selectDidIssuesInvalidate,
  state => state.getIn(['home', 'isFetching']),
  state => state.getIn(['home', 'data']),
  (didInvalidate, isFetching, data) => !didInvalidate && !isFetching && data.size === 0,
);

export const selectIsIssuesSuccessfullyBeLoaded = createSelector(
  selectIssues,
  ({ didInvalidate, isFetching, isRequestFailed }) => !didInvalidate && !isFetching && !isRequestFailed,
);

export const selectIssuesPagesCount = createSelector(
  state => state.getIn(['home', 'issuesPagesCount']),
  value => value,
);
