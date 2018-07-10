import { getIssueUrl } from 'utils/GitHubApi';
import mapGithubIssueToLocalIssue from 'containers/IssuesListPage/utils/mapGithubIssueToLocalIssue';
import { makeRequest, mapErrorCauseToMessage, mapErrorToCauseEnum } from 'utils/network/index';
import { RESOURCE_NOT_BE_FOUND } from 'utils/network/constants';
import { selectIssueFromIssuesListPage } from './selectors';
import { ISSUE_NOT_BE_FOUND_MESSAGE, RECEIVE_ISSUE, RECEIVE_ISSUE_ERROR, REQUEST_ISSUE } from './constants';

export const ReceiveIssue = issue => ({
  type: RECEIVE_ISSUE,
  issue,
});

const ReceiveIssueError = errorMessage => ({
  type: RECEIVE_ISSUE_ERROR,
  errorMessage,
});

export const RequestIssue = () => ({
  type: REQUEST_ISSUE,
});

export const fetchIssueIfNeeded = ({ userName, repoName, issueNumber }) => (dispatch, getState) => {
  const issueFromIssuesListPage = selectIssueFromIssuesListPage(getState(), issueNumber);
  if (issueFromIssuesListPage) {
    dispatch(ReceiveIssue(issueFromIssuesListPage));
  } else {
    dispatch(RequestIssue());
    dispatch(fetchIssue({ userName, repoName, issueNumber }));
  }
};

export const fetchIssue = ({ userName, repoName, issueNumber }) => async dispatch => {
  const url = getIssueUrl(userName.trim(), repoName.trim(), issueNumber);
  try {
    const data = await makeRequest(url);
    const issue = mapGithubIssueToLocalIssue(data);
    return dispatch(ReceiveIssue(issue));
  } catch (e) {
    const cause = mapErrorToCauseEnum(e);
    const message = mapErrorCauseToMessage(cause, {
      [RESOURCE_NOT_BE_FOUND]: ISSUE_NOT_BE_FOUND_MESSAGE,
    });
    return dispatch(ReceiveIssueError(message));
  }
};
