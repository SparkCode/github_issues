import { push } from 'react-router-redux';
import marked from 'marked';
import * as constants from './constants';
import * as api from '../utils/GitHubApi';
import {
  makeRequest,
  NetworkError,
  UnsuccessfulRequestError,
} from '../utils/Network';

const invalidateIssues = () => ({
  type: constants.INVALIDATE_ISSUES,
});

const ReceiveIssues = (issues) => ({
  type: constants.RECEIVE_ISSUES,
  issues,
});

const ReceiveIssuesError = (errorMessage) => ({
  type: constants.RECEIVE_ISSUES_ERROR,
  errorMessage,
});

const ReceiveIssuesPagesCount = (issuesPagesCount) => ({
  type: constants.RECEIVE_ISSUES_PAGES_COUNT,
  issuesPagesCount,
});

const ReceiveUserRepos = (repos) => ({
  type: constants.RECEIVE_USER_REPOSITORIES,
  repos,
});

const RequestIssues = () => ({
  type: constants.REQUEST_ISSUES,
});

export const searchIssues = ({
  userName,
  repoName,
  issuesCount,
  pageNumber,
}) => (dispatch) => {
  dispatch(
    push(
      `/${userName}/${repoName}/issues?issuesCount=${issuesCount}&pageNumber=${pageNumber}`,
    ),
  );
  dispatch(invalidateIssues());
};

export const gotoIssue = ({ issueId, userName, repoName }) => (
  dispatch,
  getState,
) => {
  const { number: issueNumber } = getState().toJS().home.issues.data.find(
    ({ id }) => id === issueId,
  );
  dispatch(push(`/${userName}/${repoName}/issues/${issueNumber}`));
};

const shouldUpdateIssues = (state, userName, repoName) =>
  state.issues.didInvalidate && userName && repoName;

const shouldUpdateIssue = (state, userName, repoName, issueNumber) =>
  state.issues.didInvalidate && userName && repoName && issueNumber;

export const fetchIssueIfNeeded = ({ userName, repoName, issueNumber }) => (
  dispatch,
  getState,
) => {
  if (!shouldUpdateIssue(getState().toJS().home, userName, repoName, issueNumber)) {
    return;
  }
  dispatch(RequestIssues());
  dispatch(fetchIssue({ userName, repoName, issueNumber }));
};

export const fetchIssuesIfNeeded = (query) => (dispatch, getState) => {
  const state = getState().toJS().home;
  const { userName, repoName, ...props } = query;
  if (!shouldUpdateIssues(state, userName, repoName)) {
    return;
  }
  dispatch(RequestIssues());
  dispatch(fetchIssues({ userName, repoName, ...props }));
  dispatch(fetchIssuesPagesCount({ userName, repoName, ...props }));
};

export const mapGithubIssueToLocalIssue = (data) => ({
  id: data.id,
  number: data.number,
  title: data.title,
  createdAt: data.created_at,
  body: marked(data.body),
  issueUrl: data.html_url,
  repositoryUrl: data.repository_url,
  state: data.state,
  userLogin: data.user.login,
  userUrl: data.user.html_url,
  userAvatarUrl: `${data.user.avatar_url}`,
});

const onFetchIssuesError = (dispatch, e, notBeFoundMessage = '') => {
  const message =
    e instanceof NetworkError
      ? constants.NO_INTERNET_CONNECTION_MESSAGE
      : e instanceof UnsuccessfulRequestError
        ? e.response.status
          ? notBeFoundMessage
          : constants.SOMETHING_WENT_WRONG_MESSAGE
        : undefined;
  if (!message) {
    return Promise.reject(e);
  }
  dispatch(ReceiveIssuesError(message));
};

export const fetchIssue = ({ userName, repoName, issueNumber }) => async (
  dispatch,
) => {
  const url = api.getIssueUrl(
    userName.trim(),
    repoName.trim(),
    issueNumber.trim(),
  );
  try {
    const data = await makeRequest(url);
    const issue = mapGithubIssueToLocalIssue(data);
    return dispatch(ReceiveIssues([issue]));
  } catch (e) {
    onFetchIssuesError(dispatch, e, constants.ISSUE_NOT_BE_FOUND_MESSAGE);
  }
};

export const fetchIssues = ({
  userName,
  repoName,
  issuesCount,
  pageNumber,
}) => async (dispatch) => {
  const url = api.getIssuesUrl(
    userName.trim(),
    repoName.trim(),
    issuesCount.trim(),
    pageNumber.trim(),
  );
  try {
    const data = await makeRequest(url);
    const issues = data.map(mapGithubIssueToLocalIssue);
    return dispatch(ReceiveIssues(issues));
  } catch (e) {
    onFetchIssuesError(
      dispatch,
      e,
      constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE,
    );
  }
};

export const fetchIssuesPagesCount = ({
  userName,
  repoName,
  issuesCount,
}) => async (dispatch) => {
  const url = api.getIssuesPagesCountUrl(userName.trim(), repoName.trim());
  const data = await makeRequest(url);
  const overallIssues = data.open_issues_count;
  const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
  return dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
};

export const loadUserRepositories = (userName, searchString = '') => async (
  dispatch,
) => {
  const url = api.getUserReposUrl(userName.trim(), searchString.trim());
  const data = await makeRequest(url);
  const repos = await data.items.map((repo) => repo.name);
  return dispatch(ReceiveUserRepos(repos));
};
