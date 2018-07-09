import { selectDidIssuesInvalidate } from 'containers/IssuesListPage/selectors'; // todo: it's temporary solution, make some own boilerplate
import {
  RequestIssues,
  mapGithubIssueToLocalIssue,
  ReceiveIssues,
  onFetchIssuesError,
} from 'containers/IssuesListPage/actions'; // todo: it's temporary solution, make some own boilerplate
import { getIssueUrl } from 'utils/GitHubApi';
import { makeRequest } from 'utils/network/index';
import { ISSUE_NOT_BE_FOUND_MESSAGE } from './constants';

export const fetchIssueIfNeeded = ({ userName, repoName, issueNumber }) => (dispatch, getState) => {
  if (!(selectDidIssuesInvalidate(getState()) && userName && repoName && issueNumber)) {
    return;
  }
  dispatch(RequestIssues());
  dispatch(fetchIssue({ userName, repoName, issueNumber }));
};

export const fetchIssue = ({ userName, repoName, issueNumber }) => async dispatch => {
  const url = getIssueUrl(userName.trim(), repoName.trim(), issueNumber);
  try {
    const data = await makeRequest(url);
    const issue = mapGithubIssueToLocalIssue(data);
    return dispatch(ReceiveIssues([issue]));
  } catch (e) {
    return onFetchIssuesError(dispatch, e, ISSUE_NOT_BE_FOUND_MESSAGE);
  }
};
