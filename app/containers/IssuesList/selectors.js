import { createSelector } from 'reselect';

export const selectIssues = createSelector(state => state.get('issuesList'), value => value.toJS());

export const selectIssuesData = createSelector(state => state.getIn(['issuesList', 'data']), value => value.toJS());

export const selectDidIssuesInvalidate = state => state.getIn(['issuesList', 'didInvalidate']);

export const selectIsNoIssuesReceived = createSelector(
  selectDidIssuesInvalidate,
  state => state.getIn(['issuesList', 'isFetching']),
  state => state.getIn(['issuesList', 'data']),
  (didInvalidate, isFetching, data) => !didInvalidate && !isFetching && data.size === 0,
);

export const selectIssuesPagesCount = createSelector(
  state => state.getIn(['issuesList', 'issuesPagesCount']),
  value => value,
);
