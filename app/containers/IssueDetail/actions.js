import { getIssueUrl } from 'utils/GitHubApi';
import mapGithubIssueToLocalIssue from 'containers/GithubIssuesPage/mapGithubIssueToLocalIssue';
import { makeRequest, mapErrorCauseToMessage, mapErrorToCauseEnum } from 'utils/network/index';
import { RESOURCE_NOT_BE_FOUND } from 'utils/network/constants';
import { selectIssueFromIssuesListPage } from './selectors';
import { ISSUE_NOT_BE_FOUND_MESSAGE, RECEIVE_ISSUE, RECEIVE_ISSUE_ERROR, REQUEST_ISSUE } from './constants';

export const receiveIssue = issue => ({
  type: RECEIVE_ISSUE,
  issue,
});

const receiveIssueError = errorMessage => ({
  type: RECEIVE_ISSUE_ERROR,
  errorMessage,
});

export const requestIssue = () => ({
  type: REQUEST_ISSUE,
});

export const fetchIssueIfNeeded = ({ userName, repoName, issueNumber }) => (dispatch, getState) => {
  const issueFromIssuesListPage = selectIssueFromIssuesListPage(getState(), issueNumber);
  if (issueFromIssuesListPage) {
    dispatch(receiveIssue(issueFromIssuesListPage));
  } else {
    dispatch(requestIssue());
    dispatch(fetchIssue({ userName, repoName, issueNumber }));
  }
};

export const fetchIssue = ({ userName, repoName, issueNumber }) => async dispatch => {
  const url = getIssueUrl(userName.trim(), repoName.trim(), issueNumber);
  try {
    const data = await makeRequest(url);
    const issue = mapGithubIssueToLocalIssue(data);
    return dispatch(receiveIssue(issue));
  } catch (e) {
    const cause = mapErrorToCauseEnum(e);
    const message = mapErrorCauseToMessage(cause, {
      [RESOURCE_NOT_BE_FOUND]: ISSUE_NOT_BE_FOUND_MESSAGE,
    });
    return dispatch(receiveIssueError(message));
  }
};
