import { makeRequest, mapErrorCauseToMessage, mapErrorToCauseEnum } from 'utils/network/index';
import { getIssuesUrl, getIssuesPagesCountUrl } from 'utils/GitHubApi';
import { RESOURCE_NOT_BE_FOUND } from 'utils/network/constants';
import { selectDidIssuesInvalidate } from './selectors';
import * as constants from './constants';
import mapGithubIssueToLocalIssue from './utils/mapGithubIssueToLocalIssue';

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

export const fetchIssuesIfNeeded = ({ userName, repoName, ...props }) => (dispatch, getState) => {
  if (!(selectDidIssuesInvalidate(getState()) && userName && repoName)) {
    return;
  }
  dispatch(RequestIssues());
  dispatch(fetchIssues({ userName, repoName, ...props }));
  dispatch(fetchIssuesPagesCount({ userName, repoName, ...props }));
};

export const fetchIssues = ({ userName, repoName, issuesCountOnPage, pageNumber }) => async dispatch => {
  const url = getIssuesUrl(userName.trim(), repoName.trim(), issuesCountOnPage.trim(), pageNumber);
  try {
    const data = await makeRequest(url);
    const issues = data.map(mapGithubIssueToLocalIssue);
    return dispatch(ReceiveIssues(issues));
  } catch (e) {
    const cause = mapErrorToCauseEnum(e);
    const message = mapErrorCauseToMessage(cause, {
      [RESOURCE_NOT_BE_FOUND]: constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE,
    });
    return dispatch(ReceiveIssuesError(message));
  }
};

export const fetchIssuesPagesCount = ({ userName, repoName, issuesCountOnPage }) => async dispatch => {
  const url = getIssuesPagesCountUrl(userName.trim(), repoName.trim());
  const data = await makeRequest(url);
  const overallIssues = data.open_issues_count;
  const issuesPagesCount = Math.ceil(overallIssues / issuesCountOnPage);
  return dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
};
