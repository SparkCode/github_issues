import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import * as api from 'utils/GitHubApi';
import mapGithubIssueToLocalIssue from 'containers/IssuesListPage/utils/mapGithubIssueToLocalIssue';
import { fetchIssue } from '../actions';
import * as constants from '../constants';

describe('async actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchIssue', () => {
    it('should dispatch RECEIVE_ISSUES action, when issues be received', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issueNumber = '1';

      const body = {
        id: 10,
        number: 20,
        title: 'title',
        createdAt: '2017-08-30T23:58:32Z',
        body: '',
        issueUrl: 'html_url',
        repositoryUrl: 'repositoryUrl',
        state: 'state',
        user: { html_url: 'html_url', avatar_url: 'avatar_url' },
      };

      nock(api.hostname)
        .get(api.withAccessToken(api.getIssuePath(userName, repoName, issueNumber)))
        .reply(200, body);

      const store = mockStore({});
      const expectedActions = [
        {
          type: constants.RECEIVE_ISSUE,
          issue: mapGithubIssueToLocalIssue(body),
        },
      ];

      return store.dispatch(fetchIssue({ userName, repoName, issueNumber })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('should dispatch RECEIVE_ISSUES_ERROR action, when request not be successful', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issueNumber = '1';

      nock(api.hostname)
        .get(api.withAccessToken(api.getIssuePath(userName, repoName, issueNumber)))
        .reply(404);

      const store = mockStore({});
      const expectedActions = [
        {
          type: constants.RECEIVE_ISSUE_ERROR,
          errorMessage: constants.ISSUE_NOT_BE_FOUND_MESSAGE,
        },
      ];

      return store
        .dispatch(fetchIssue({ userName, repoName, issueNumber }))
        .catch(() => Promise.resolve())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
    });
  });
});
