import { createSelector } from 'reselect';
import { List } from 'immutable';

export const IssueDetailPage = createSelector(state => state.get('issueDetailPage'), value => value.toJS());

export const selectIssueFromIssuesListPage = createSelector(
  (state, issueNumber) =>
    state.getIn(['issuesListPage', 'data'], new List()).find(issue => issue.get('number') === issueNumber),
  value => value && value.toJS(),
);

export const selectIssue = createSelector(
  state => state.getIn(['issueDetailPage', 'data']),
  value => value && value.toJS(),
);

export const selectIsIssueSuccessfullyBeLoaded = createSelector(
  IssueDetailPage,
  ({ isFetching, isRequestFailed, didInvalidate }) => !isFetching && !isRequestFailed && !didInvalidate,
);
