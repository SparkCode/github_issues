import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultIssuesState = fromJS({
  didInvalidate: true,
  isFetching: false,
  isRequestFailed: false,
  errorMessage: '',
  data: null,
});

const reducer = (state = defaultIssuesState, action) => {
  switch (action.type) {
    case constants.REQUEST_ISSUE: {
      return state.set('didInvalidate', false).set('isFetching', true);
    }

    case constants.RECEIVE_ISSUE: {
      return state
        .set('data', fromJS(action.issue))
        .set('didInvalidate', false)
        .set('isFetching', false);
    }

    case constants.RECEIVE_ISSUE_ERROR: {
      return state
        .set('isFetching', false)
        .set('isRequestFailed', true)
        .set('errorMessage', action.errorMessage);
    }
    default:
      return state;
  }
};

export default reducer;
