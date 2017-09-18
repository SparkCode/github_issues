import * as constants from "./constants"
import { push } from 'react-router-redux'
import marked from "marked";
import * as api  from "../utils/GitHubApi";
import {makeRequest, NetworkError, UnsuccessfulRequestError} from "../utils/Network";

const invalidateIssues = () => {
    return {
        type: constants.INVALIDATE_ISSUES
    }
};

const ReceiveIssues = (issues) => {
    return {
        type: constants.RECEIVE_ISSUES,
        issues
    }
};

const ReceiveIssuesError = (errorMessage) => {
    return {
        type: constants.RECEIVE_ISSUES_ERROR,
        errorMessage
    }
};

const ReceiveIssuesPagesCount = (issuesPagesCount) => {
    return {
        type: constants.RECEIVE_ISSUES_PAGES_COUNT,
        issuesPagesCount
    }
};

const ReceiveUserRepos = (repos) => {
    return {
        type: constants.RECEIVE_USER_REPOSITORIES,
        repos
    }
};

const RequestIssues = () => {
    return {
        type: constants.REQUEST_ISSUES
    }
};

export const searchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    dispatch(push(`/${userName}/${repoName}/issues?issuesCount=${issuesCount}&pageNumber=${pageNumber}`));
    dispatch(invalidateIssues());
};

export const gotoIssue = ({issueId, userName, repoName}) => (dispatch, getState) => {
    const issueNumber = getState().issues.data.find(i => i.id === issueId).number;
    dispatch(push(`/${userName}/${repoName}/issues/${issueNumber}`));
};

const shouldUpdateIssues = (state, userName, repoName) => {
    return state.issues.didInvalidate && userName && repoName;
};

const shouldUpdateIssue  = (state, userName, repoName, issueNumber) => {
    return state.issues.didInvalidate && userName && repoName && issueNumber;
};

export const fetchIssueIfNeeded = ({userName, repoName, issueNumber}) => (dispatch, getState) => {
    if (!shouldUpdateIssue(getState(), userName, repoName, issueNumber))
        return;
    dispatch(RequestIssues());
    dispatch(fetchIssue({userName, repoName, issueNumber}));
};

export const fetchIssuesIfNeeded = (query) => (dispatch, getState) => {
    const state = getState();
    const {userName, repoName, ...props} = query;
    if (!shouldUpdateIssues(state, userName, repoName))
        return;
    dispatch(RequestIssues());
    dispatch(fetchIssues({userName, repoName, ...props}));
    dispatch(fetchIssuesPagesCount({userName, repoName, ...props}));
};

export const mapGithubIssueToLocalIssue = (data) => {return {
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
    userAvatarUrl: `${data.user.avatar_url}`
}};

const onFetchIssuesError = (dispatch, e, notBeFoundMessage="") => {
    const message = e instanceof NetworkError ? constants.NO_INTERNET_CONNECTION_MESSAGE :
        e instanceof UnsuccessfulRequestError ?
            (e.response.status ? notBeFoundMessage : constants.SOMETHING_WENT_WRONG_MESSAGE)
            : undefined;
    if (!message)
        return Promise.reject(e);
    dispatch(ReceiveIssuesError(message));
};

export const fetchIssue = ({userName, repoName, issueNumber}) => (dispatch) => {
    const url = api.getIssueUrl(userName.trim(), repoName.trim(), issueNumber.trim());
    return makeRequest(url)
        .then(mapGithubIssueToLocalIssue)
        .then(issue => dispatch(ReceiveIssues([issue])))
        .catch(e => onFetchIssuesError(dispatch, e, constants.ISSUE_NOT_BE_FOUND_MESSAGE));
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    const url = api.getIssuesUrl(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber.trim());
    return makeRequest(url)
        .then(data => data.map(mapGithubIssueToLocalIssue))
        .then(issues => dispatch(ReceiveIssues(issues)))
        .catch(e => onFetchIssuesError(dispatch, e, constants.USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE));
};

export const fetchIssuesPagesCount = ({userName, repoName, issuesCount}) => (dispatch) => {
    const url = api.getIssuesPagesCountUrl(userName.trim(), repoName.trim());
    return makeRequest(url)
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
        })
};

export const loadUserRepositories = (userName, searchString="") => (dispatch) =>  {
    const url = api.getUserReposUrl(userName.trim(), searchString.trim());
    return makeRequest(url)
        .then(data => data.items.map(repo => repo.name))
        .then(repos => dispatch(ReceiveUserRepos(repos)))
};




