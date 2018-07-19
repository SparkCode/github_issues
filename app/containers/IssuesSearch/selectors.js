import { createSelector } from 'reselect';

export const selectUserRepositories = createSelector(
  state => state.getIn(['issuesSearch', 'repositories']),
  value => value.toJS(),
);
