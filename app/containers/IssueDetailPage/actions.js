import { getIssueUrl } from 'utils/GitHubApi';
import { mapGithubIssueToLocalIssue } from 'containers/IssuesListPage/utils/mapGithubIssueToLocalIssue';
import { makeRequest, NetworkError, UnsuccessfulRequestError } from 'utils/network/index';
import { NO_INTERNET_CONNECTION_MESSAGE } from 'utils/network/constants'; // todo: duplication import with above
import { selectIssueFromIssuesListPage } from './selectors';
import {
  ISSUE_NOT_BE_FOUND_MESSAGE,
  RECEIVE_ISSUE,
  RECEIVE_ISSUE_ERROR,
  REQUEST_ISSUE,
  SOMETHING_WENT_WRONG_MESSAGE,
} from './constants';

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
    {
      /* eslint-disable no-nested-ternary  */
      // todo: code duplication
      const message =
        e instanceof NetworkError
          ? NO_INTERNET_CONNECTION_MESSAGE
          : e instanceof UnsuccessfulRequestError
            ? e.response.status === 404
              ? ISSUE_NOT_BE_FOUND_MESSAGE
              : SOMETHING_WENT_WRONG_MESSAGE
            : undefined;
      /* eslint-enable no-nested-ternary  */
      if (!message) return Promise.reject(e);
      return dispatch(ReceiveIssueError(message));
    }
  }
};
