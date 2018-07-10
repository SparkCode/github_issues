import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import * as api from 'utils/GitHubApi';
import { fetchIssues, fetchIssuesPagesCount } from '../actions';
import mapGithubIssueToLocalIssue from '../utils/mapGithubIssueToLocalIssue';
import * as constants from '../constants';

describe('async actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchIssuesPagesCount', () => {
    it('should dispatch RECEIVE_ISSUES_PAGES_COUNT action, when issues pages count be received', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issuesCount = '10';
      const body = { open_issues_count: 100 };

      nock(api.hostname)
        .get(api.withAccessToken(api.getReposInformationPath(userName, repoName)))
        .reply(200, body);

      const store = mockStore({});
      const expectedActions = [{ type: constants.RECEIVE_ISSUES_PAGES_COUNT, issuesPagesCount: 10 }];

      return store.dispatch(fetchIssuesPagesCount({ userName, repoName, issuesCount })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('should dispatch no actions, when request not be successful', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issuesCount = '10';

      nock(api.hostname)
        .get(api.withAccessToken(api.getReposInformationPath(userName, repoName)))
        .reply(404);

      const initState = {};
      const store = mockStore(initState);

      return store
        .dispatch(fetchIssuesPagesCount({ userName, repoName, issuesCount }))
        .catch(() => Promise.resolve())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
    });
  });

  describe('fetchIssues', () => {
    it('should dispatch RECEIVE_ISSUES action, when issues be received', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issuesCount = '10';
      const pageNumber = '1';

      const body = [
        {
          id: 10,
          number: 20,
          title: 'title',
          createdAt: '2017-08-30T23:58:32Z',
          body: '',
          issueUrl: 'html_url',
          repositoryUrl: 'repositoryUrl',
          state: 'state',
          user: { html_url: 'html_url', avatar_url: 'avatar_url' },
        },
      ];

      nock(api.hostname)
        .get(api.withAccessToken(api.getIssuesPath(userName, repoName, issuesCount, pageNumber)))
        .reply(200, body);

      const store = mockStore({});
      const expectedActions = [
        {
          type: constants.RECEIVE_ISSUES,
          issues: body.map(mapGithubIssueToLocalIssue),
        },
      ];

      return store
        .dispatch(
          fetchIssues({
            userName,
            repoName,
            issuesCount,
            pageNumber,
          }),
        )
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
    });

    it('should dispatch RECEIVE_ISSUES_ERROR action, when request not be successful', () => {
      const userName = 'userName';
      const repoName = 'repoName';
      const issuesCount = '10';
      const pageNumber = '1';

      nock(api.hostname)
        .get(api.withAccessToken(api.getIssuesPath(userName, repoName, issuesCount, pageNumber)))
        .reply(404);

      const store = mockStore({});
      const expectedActions = [
        {
          type: constants.RECEIVE_ISSUES_ERROR,
          errorMessage: constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE,
        },
      ];

      return store
        .dispatch(
          fetchIssues({
            userName,
            repoName,
            issuesCount,
            pageNumber,
          }),
        )
        .catch(() => Promise.resolve())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
    });
  });
});
