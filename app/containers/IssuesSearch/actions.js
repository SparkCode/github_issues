import { push } from 'react-router-redux';
import { getUserReposUrl } from 'utils/GitHubApi';
import { makeRequest } from 'utils/network/index';
import * as constants from './constants';

export const IssuesSearch = ({ userName, repoName, issuesCount, pageNumber }) => dispatch =>
  dispatch(push(`/${userName}/${repoName}/issues?issuesCount=${issuesCount}&pageNumber=${pageNumber}`));

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
