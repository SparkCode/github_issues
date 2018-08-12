import { fromJS } from 'immutable';
import * as constants from 'containers/IssuesList/constants';
import reducer, { defaultIssuesState as initState } from '../reducer';

describe('IssuesList', () => {
  it('should return the init state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should not affect state', () => {
    expect(reducer(undefined, { type: 'NOT_EXISTING' })).toEqual(initState);
  });

  it('should handle INVALIDATE_ISSUES action', () => {
    const originalState = initState.set('data', fromJS([{ id: 1 }, { id: 2 }, { id: 5 }]));
    const expectedState = initState.set('didInvalidate', true);
    expect(reducer(originalState, { type: constants.INVALIDATE_ISSUES })).toEqual(fromJS(expectedState));
  });

  it('should handle REQUEST_ISSUES action', () => {
    const originalState = initState;
    const expectedState = initState.set('didInvalidate', false).set('isFetching', true);
    expect(reducer(originalState, { type: constants.REQUEST_ISSUES })).toEqual(expectedState);
  });

  it('should handle RECEIVE_ISSUES action', () => {
    const originalState = initState
      .set('data', fromJS([{ id: 1 }, { id: 2 }, { id: 5 }]))
      .set('isFetching', true)
      .set('didInvalidate', false);
    const newIssues = [{ id: 7 }, { id: 8 }, { id: 9 }];
    const expectedState = originalState.set('isFetching', false).set('data', fromJS(newIssues));
    expect(
      reducer(originalState, {
        type: constants.RECEIVE_ISSUES,
        issues: newIssues,
      }),
    ).toEqual(expectedState);
  });

  it('should handle RECEIVE_ISSUES_ERROR action', () => {
    const originalState = initState
      .set('data', [{ id: 1 }, { id: 2 }, { id: 5 }])
      .set('isFetching', true)
      .set('didInvalidate', false);
    const errorMessage = 'Message';
    const expectedState = originalState
      .set('isFetching', false)
      .set('isRequestFailed', true)
      .set('errorMessage', errorMessage);
    expect(
      reducer(originalState, {
        type: constants.RECEIVE_ISSUES_ERROR,
        errorMessage,
      }),
    ).toEqual(expectedState);
  });

  it('should handle RECEIVE_ISSUES_PAGES_COUNT action', () => {
    const originalState = initState;
    const issuesPagesCount = 5;
    const expectedState = originalState.set('issuesPagesCount', issuesPagesCount);
    expect(
      reducer(originalState, {
        type: constants.RECEIVE_ISSUES_PAGES_COUNT,
        issuesPagesCount,
      }),
    ).toEqual(expectedState);
  });
});
