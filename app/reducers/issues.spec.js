import { fromJS } from 'immutable';
import issues from './issues';
import * as constants from '../actionCreators/constants';

describe('Issue', () => {
  const initState = fromJS({
    didInvalidate: true,
    isFetching: false,
    isRequestFailed: false,
    errorMessage: '',
    data: [],
    paging: {
      issuesCountOptions: ['10', '20', '30', '50', '100'],
      defaultIssuesCountOption: '20',
      issuesPagesCount: null,
    },
  });

  it('should return the init state', () => {
    expect(issues(undefined, {})).toEqual(initState);
  });

  it('should not affect state', () => {
    expect(issues(undefined, { type: 'NOT_EXISTING' })).toEqual(initState);
  });

  it('should handle INVALIDATE_ISSUES action', () => {
    const originalState = initState.set('didInvalidate', false).set('data', fromJS([{ id: 1 }, { id: 2 }, { id: 5 }]));
    const expectedState = initState;
    expect(issues(originalState, { type: constants.INVALIDATE_ISSUES })).toEqual(fromJS(expectedState));
  });

  it('should handle REQUEST_ISSUES action', () => {
    const originalState = initState;
    const expectedState = initState.set('didInvalidate', false).set('isFetching', true);
    expect(issues(originalState, { type: constants.REQUEST_ISSUES })).toEqual(expectedState);
  });

  it('should handle RECEIVE_ISSUES action', () => {
    const originalState = initState
      .set('data', fromJS([{ id: 1 }, { id: 2 }, { id: 5 }]))
      .set('isFetching', true)
      .set('didInvalidate', false);
    const newIssues = [{ id: 7 }, { id: 8 }, { id: 9 }];
    const expectedState = originalState.set('isFetching', false).set('data', fromJS(newIssues));
    expect(
      issues(originalState, {
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
      issues(originalState, {
        type: constants.RECEIVE_ISSUES_ERROR,
        errorMessage,
      }),
    ).toEqual(expectedState);
  });

  it('should handle RECEIVE_ISSUES_PAGES_COUNT action', () => {
    const originalState = initState;
    const issuesPagesCount = 5;
    const expectedState = originalState.setIn(['paging', 'issuesPagesCount'], issuesPagesCount);
    expect(
      issues(originalState, {
        type: constants.RECEIVE_ISSUES_PAGES_COUNT,
        issuesPagesCount,
      }),
    ).toEqual(expectedState);
  });
});
