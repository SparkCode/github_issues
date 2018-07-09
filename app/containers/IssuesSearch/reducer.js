import { fromJS } from 'immutable';
import { RECEIVE_USER_REPOSITORIES } from './constants';

export const defaultState = fromJS({
  repositories: [],
  issuesCountOptions: ['10', '20', '30', '50', '100'],
  defaultIssuesCountOption: '20',
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
