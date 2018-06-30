import { fromJS } from 'immutable';
import * as constants from '../actionCreators';

const defaultIssuesState = fromJS({
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

const issues = (state = defaultIssuesState, action) => {
  switch (action.type) {
    case constants.INVALIDATE_ISSUES: {
      return state
        .set('didInvalidate', true)
        .set('data', fromJS([]))
        .set('isRequestFailed', false)
        .set('errorMessage', '')
        .setIn(['paging', 'issuesPagesCount'], null);
    }

    case constants.REQUEST_ISSUES: {
      return state.set('didInvalidate', false).set('isFetching', true);
    }

    case constants.RECEIVE_ISSUES: {
      return state.set('data', fromJS(action.issues)).set('isFetching', false);
    }

    case constants.RECEIVE_ISSUES_ERROR: {
      return state
        .set('isFetching', false)
        .set('isRequestFailed', true)
        .set('errorMessage', action.errorMessage);
    }

    case constants.RECEIVE_ISSUES_PAGES_COUNT: {
      return state.setIn(['paging', 'issuesPagesCount'], action.issuesPagesCount);
    }
    default:
      return state;
  }
};

export default issues;
