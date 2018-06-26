import { fromJS } from 'immutable';
import { RECEIVE_USER_REPOSITORIES } from '../actionCreators';

const userRepositories = (state = fromJS([]), action) => {
  switch (action.type) {
    case RECEIVE_USER_REPOSITORIES: {
      return fromJS(action.repos);
    }
    default:
      return state;
  }
};

export default userRepositories;
