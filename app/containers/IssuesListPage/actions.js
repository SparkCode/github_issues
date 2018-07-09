import { push } from 'react-router-redux';
import { makeRequest, NetworkError, UnsuccessfulRequestError } from 'utils/network/index';
import { NO_INTERNET_CONNECTION_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from 'utils/network/constants'; // todo: duplication import with above
import { getIssuesUrl, getIssuesPagesCountUrl } from 'utils/GitHubApi';
import { selectDidIssuesInvalidate } from './selectors';
import * as constants from './constants';

export const invalidateIssues = () => ({
  type: constants.INVALIDATE_ISSUES,
});

export const ReceiveIssues = issues => ({
  type: constants.RECEIVE_ISSUES,
  issues,
});

const ReceiveIssuesError = errorMessage => ({
  type: constants.RECEIVE_ISSUES_ERROR,
  errorMessage,
});

const ReceiveIssuesPagesCount = issuesPagesCount => ({
  type: constants.RECEIVE_ISSUES_PAGES_COUNT,
  issuesPagesCount,
});

export const RequestIssues = () => ({
  type: constants.REQUEST_ISSUES,
});

export const IssuesSearch = ({ userName, repoName, issuesCount, pageNumber }) => dispatch => {
  dispatch(push(`/${userName}/${repoName}/issues?issuesCount=${issuesCount}&pageNumber=${pageNumber}`));
  dispatch(invalidateIssues());
};

export const goToIssue = ({ number, userName, repoName, issuesCount }) => dispatch =>
  dispatch(push(`/${userName}/${repoName}/issues/${number}?issuesCount=${issuesCount}`));

export const fetchIssuesIfNeeded = ({ userName, repoName, ...props }) => (dispatch, getState) => {
  if (!(selectDidIssuesInvalidate(getState()) && userName && repoName)) {
    return;
  }
  dispatch(RequestIssues());
  dispatch(fetchIssues({ userName, repoName, ...props }));
  dispatch(fetchIssuesPagesCount({ userName, repoName, ...props }));
};

export const mapGithubIssueToLocalIssue = data => ({
  id: data.id,
  number: data.number,
  title: data.title,
  createdAt: data.created_at,
  body: data.body,
  issueUrl: data.html_url,
  repositoryUrl: data.repository_url,
  state: data.state,
  userLogin: data.user.login,
  userUrl: data.user.html_url,
  userAvatarUrl: `${data.user.avatar_url}`,
});

export const onFetchIssuesError = (dispatch, e, notBeFoundMessage = '') => {
  /* eslint-disable no-nested-ternary  */
  const message =
    e instanceof NetworkError
      ? NO_INTERNET_CONNECTION_MESSAGE
      : e instanceof UnsuccessfulRequestError
        ? e.response.status
          ? notBeFoundMessage
          : SOMETHING_WENT_WRONG_MESSAGE // todo: AAAAAAAAAA
        : undefined;
  /* eslint-enable no-nested-ternary  */
  if (!message) {
    return Promise.reject(e);
  }
  return dispatch(ReceiveIssuesError(message));
};

export const fetchIssues = ({ userName, repoName, issuesCount, pageNumber }) => async dispatch => {
  const url = getIssuesUrl(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber);
  try {
    const data = await makeRequest(url);
    const issues = data.map(mapGithubIssueToLocalIssue);
    return dispatch(ReceiveIssues(issues));
  } catch (e) {
    return onFetchIssuesError(dispatch, e, constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE);
  }
};

export const fetchIssuesPagesCount = ({ userName, repoName, issuesCount }) => async dispatch => {
  const url = getIssuesPagesCountUrl(userName.trim(), repoName.trim());
  const data = await makeRequest(url);
  const overallIssues = data.open_issues_count;
  const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
  return dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
};
