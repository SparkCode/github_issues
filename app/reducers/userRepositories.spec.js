import { fromJS } from 'immutable';
import userRepositories from './userRepositories';
import { RECEIVE_USER_REPOSITORIES } from '../actionCreators/constants';

describe('Issue', () => {
  it('should return the init state', () => {
    const expectedState = fromJS([]);
    expect(userRepositories(undefined, {})).toEqual(expectedState);
  });

  it('should not affect state', () => {
    const expectedState = fromJS([]);
    expect(userRepositories(undefined, { type: 'NOT_EXISTING' })).toEqual(expectedState);
  });

  it('should delete old and add new repositories', () => {
    const originalState = fromJS(['repo1', 'repo2', 'repo3', 'repo4']);
    const newRepos = ['repo5', 'repo6', 'repo7'];
    const expectedState = fromJS(newRepos);
    expect(
      userRepositories(originalState, {
        type: RECEIVE_USER_REPOSITORIES,
        repos: newRepos,
      }),
    ).toEqual(expectedState);
  });
});
