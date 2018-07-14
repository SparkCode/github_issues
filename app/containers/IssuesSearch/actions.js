import { push } from 'react-router-redux';
import { getUserReposUrl } from 'utils/GitHubApi';
import { makeRequest } from 'utils/network/index';
import { invalidateIssues } from 'containers/IssuesList/actions';
import * as constants from './constants';

export const IssuesSearch = ({ userName, repoName, issuesCountOnPage, pageNumber }) => dispatch => {
  dispatch(
    push(`/github-issues/${userName}/${repoName}?issuesCountOnPage=${issuesCountOnPage}&pageNumber=${pageNumber}`),
  );
  // todo: looks like no good solution
  dispatch(invalidateIssues());
};

const ReceiveUserRepos = repos => ({
  type: constants.RECEIVE_USER_REPOSITORIES,
  repos,
});

export const loadUserRepositories = (userName, searchString = '') => async dispatch => {
  const url = getUserReposUrl(userName.trim(), searchString.trim());
  const data = await makeRequest(url);
  const repos = await data.items.map(repo => repo.name);
  return dispatch(ReceiveUserRepos(repos));
};
