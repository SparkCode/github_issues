import { combineReducers } from 'redux-immutable';
import issues from './issues';
import userRepositories from './userRepositories';

const rootReducer = combineReducers({
  issues,
  userRepositories,
});

export default rootReducer;
