import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import * as api from 'utils/GitHubApi';
import { loadUserRepositories } from '../actions';
import * as constants from '../constants';

describe('async actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('loadUserRepositories', () => {
    it('should dispatch RECEIVE_USER_REPOSITORIES action, when user repositories be received', () => {
      const userName = 'userName';
      const repos = ['project1', 'project2', 'project3'];
      const body = { items: repos.map(name => ({ name })) };
      nock(api.hostname)
        .get(api.makePathString(api.getUserReposPath(userName, '')))
        .reply(200, body);

      const expectedAction = [{ type: constants.RECEIVE_USER_REPOSITORIES, repos }];
      const initState = {};
      const store = mockStore(initState);

      return store.dispatch(loadUserRepositories(userName)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedAction);
      });
    });

    it('should dispatch no actions, when request not be successful', () => {
      const userName = 'userName';
      nock(api.hostname)
        .get(api.makePathString(api.getUserReposPath(userName, '')))
        .reply(404);

      const initState = {};
      const store = mockStore(initState);

      return store
        .dispatch(loadUserRepositories(userName))
        .catch(() => Promise.resolve())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
    });
  });
});
