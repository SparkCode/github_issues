import {
    INVALIDATE_ISSUES, ISSUE_NOT_BE_FOUND_MESSAGE, NO_INTERNET_CONNECTION_MESSAGE, RECEIVE_ISSUES, RECEIVE_ISSUES_ERROR,
    RECEIVE_ISSUES_PAGES_COUNT,
    RECEIVE_USER_REPOSITORIES, REQUEST_ISSUES, USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE
} from "./constants"
import { push } from 'react-router-redux'
import logError from "../utils"
import marked from "marked";

import {getIssue, getIssues, getIssuesPagesCount, getUserRepos} from "../utils/GitHubApi";

const invalidateIssues = () => {
    return {
        type: INVALIDATE_ISSUES
    }
};

const ReceiveIssues = (issues) => {
    return {
        type: RECEIVE_ISSUES,
        issues
    }
};

const ReceiveIssuesError = (errorMessage) => {
    return {
        type: RECEIVE_ISSUES_ERROR,
        errorMessage
    }
};

const ReceiveIssuesPagesCount = (issuesPagesCount) => {
    return {
        type: RECEIVE_ISSUES_PAGES_COUNT,
        issuesPagesCount
    }
};

const ReceiveUserRepos = (repos) => {
    return {
        type: RECEIVE_USER_REPOSITORIES,
        repos
    }
};

const RequestIssues = () => {
    return {
        type: REQUEST_ISSUES
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

export const fetchIssue = ({userName, repoName, issueNumber}) => (dispatch) => {
    return getIssue(userName.trim(), repoName.trim(), issueNumber.trim())
        .then(mapGithubIssueToLocalIssue)
        .then(issue => dispatch(ReceiveIssues([issue])))
        .catch((e) => {
            const message = e instanceof TypeError ? NO_INTERNET_CONNECTION_MESSAGE : ISSUE_NOT_BE_FOUND_MESSAGE;  //todo:
            dispatch(ReceiveIssuesError(message));
        });
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    return getIssues(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber.trim())
        .then(data => data.map(mapGithubIssueToLocalIssue))
        .then(issues => dispatch(ReceiveIssues(issues)))
        .catch((e) => {
            const message = e instanceof TypeError ? NO_INTERNET_CONNECTION_MESSAGE : USER_OR_REPOSITORY_NOT_BE_FOUND_MESSAGE;  //todo:
            dispatch(ReceiveIssuesError(message));
        });
};

export const fetchIssuesPagesCount = ({userName, repoName, issuesCount}) => (dispatch) => {
    return getIssuesPagesCount(userName.trim(), repoName.trim())
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
        })
        .catch(logError); //todo
};

export const loadUserRepositories = (userName, searchString="") => (dispatch) =>  {
    return getUserRepos(userName.trim(), searchString.trim())
            .then(data => data.items.map(repo => repo.name))
            .then(repos => dispatch(ReceiveUserRepos(repos)))
            .catch(logError);
};




