import { makeRequest, mapErrorCauseToMessage, mapErrorToCauseEnum } from 'utils/network/index';
import { getIssuesUrl, getIssuesPagesCountUrl } from 'utils/GitHubApi';
import { RESOURCE_NOT_BE_FOUND } from 'utils/network/constants';
import mapGithubIssueToLocalIssue from 'containers/GithubIssuesPage/mapGithubIssueToLocalIssue';
import * as constants from './constants';

export const invalidateIssues = () => ({
  type: constants.INVALIDATE_ISSUES,
});

export const receiveIssues = issues => ({
  type: constants.RECEIVE_ISSUES,
  issues,
});

const receiveIssuesError = errorMessage => ({
  type: constants.RECEIVE_ISSUES_ERROR,
  errorMessage,
});

const receiveIssuesPagesCount = issuesPagesCount => ({
  type: constants.RECEIVE_ISSUES_PAGES_COUNT,
  issuesPagesCount,
});

export const requestIssues = () => ({
  type: constants.REQUEST_ISSUES,
});

export const loadIssuesListData = ({ userName, repoName, ...props }) => dispatch => {
  dispatch(invalidateIssues());
  dispatch(requestIssues());
  dispatch(fetchIssues({ userName, repoName, ...props }));
  dispatch(fetchIssuesPagesCount({ userName, repoName, ...props }));
};

export const fetchIssues = ({ userName, repoName, issuesCountOnPage, pageNumber }) => async dispatch => {
  const url = getIssuesUrl(userName.trim(), repoName.trim(), issuesCountOnPage.trim(), pageNumber);
  try {
    const data = await makeRequest(url);
    const issues = data.map(mapGithubIssueToLocalIssue);
    return dispatch(receiveIssues(issues));
  } catch (e) {
    const cause = mapErrorToCauseEnum(e);
    const message = mapErrorCauseToMessage(cause, {
      [RESOURCE_NOT_BE_FOUND]: constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE,
    });
    return dispatch(receiveIssuesError(message));
  }
};

export const fetchIssuesPagesCount = ({ userName, repoName, issuesCountOnPage }) => async dispatch => {
  const url = getIssuesPagesCountUrl(userName.trim(), repoName.trim());
  const data = await makeRequest(url);
  const overallIssues = data.open_issues_count;
  const issuesPagesCount = Math.ceil(overallIssues / issuesCountOnPage);
  return dispatch(receiveIssuesPagesCount(issuesPagesCount));
};
