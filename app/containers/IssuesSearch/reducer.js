import { fromJS } from 'immutable';
import { RECEIVE_USER_REPOSITORIES } from './constants';

export const defaultState = fromJS({
  repositories: [],
});

const issuesSearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_USER_REPOSITORIES: {
      return state.set('repositories', fromJS(action.repos));
    }
    default:
      return state;
  }
};

export default issuesSearchReducer;
