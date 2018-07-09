import { fromJS } from 'immutable';
import { RECEIVE_USER_REPOSITORIES } from '../constants';
import issuesSearchReducer, { defaultState } from '../reducer';

describe('Issue', () => {
  it('should return the init state', () => {
    const expectedState = defaultState;
    expect(issuesSearchReducer(undefined, {})).toEqual(expectedState);
  });

  it('should not affect state', () => {
    const expectedState = defaultState;
    expect(issuesSearchReducer(undefined, { type: 'NOT_EXISTING' })).toEqual(expectedState);
  });

  it('should delete old and add new repositories', () => {
    const originalState = defaultState.set('repositories', fromJS(['repo1', 'repo2', 'repo3', 'repo4']));
    const newRepos = ['repo5', 'repo6', 'repo7'];
    const expectedState = defaultState.set('repositories', fromJS(newRepos));
    expect(
      issuesSearchReducer(originalState, {
        type: RECEIVE_USER_REPOSITORIES,
        repos: newRepos,
      }),
    ).toEqual(expectedState);
  });
});
