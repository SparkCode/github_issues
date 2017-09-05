import {
    INVALIDATE_ISSUES, RECEIVE_ISSUES, RECEIVE_ISSUES_ERROR, RECEIVE_ISSUES_PAGES_COUNT,
    RECEIVE_USER_REPOSITORIES, REQUEST_ISSUES
} from "./constants"
import { push } from 'react-router-redux'
import logError from "../utils"
import * as marked from "marked";

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

const getIssuesRequestURL = (userName, repoName, issuesCount, pageNumber) =>
    `https://api.github.com/repos/${userName}/${repoName}/issues?&per_page=${issuesCount}&page=${pageNumber}`;

const getReposInformationRequestURL = (userName, repoName) =>
    `https://api.github.com/repos/${userName}/${repoName}`;

const getUserReposRequestURL = (searchString, userName) =>
    `https://api.github.com/search/repositories?q=${searchString}+user:${userName}`;

const getIssueRequestURL = (userName, repoName, issueNumber) =>
    `https://api.github.com/repos/${userName}/${repoName}/issues/${issueNumber}`;

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

const mapGithubIssueToLocalIssue = (data) => {return {
    id: data.id,
    number: data.number,
    title: data.title,
    created_at: data.created_at,
    body: marked(data.body),
    issue_url: data.html_url,
    repository_url: data.repository_url,
    state: data.state,
    userLogin: data.user.login,
    userUrl: data.user.html_url,
    userAvatarUrl: `${data.user.avatar_url}`
}};

export const fetchIssue = ({userName, repoName, issueNumber}) => (dispatch) => {
    const url = getIssueRequestURL(userName, repoName, issueNumber);
    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else {
                dispatch(ReceiveIssuesError("Issue is not be found"));
                throw new Error(`Request error`)
            }
        })
        .then(mapGithubIssueToLocalIssue)
        .then(issue => dispatch(ReceiveIssues([issue])))
        .catch((e) => {
            e instanceof TypeError && dispatch(ReceiveIssuesError("Check your internet connection"));
            logError(e);
        });
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    let url = getIssuesRequestURL(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber.trim());
    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else {
                dispatch(ReceiveIssuesError("User or repository are not exist"));
                throw new Error(`Request error`)
            }
        })
        .then(data => data.map(mapGithubIssueToLocalIssue))
        .then(issues => dispatch(ReceiveIssues(issues)))
        .catch((e) => {
            e instanceof TypeError && dispatch(ReceiveIssuesError("Check your internet connection"));
            logError(e);
        });
};

export const fetchIssuesPagesCount = ({userName, repoName, issuesCount}) => (dispatch) => {
    const url = getReposInformationRequestURL(userName.trim(), repoName.trim());
    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else throw new Error(`Request error`)
        })
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
        })
        .catch(logError);
};

export const loadUserRepositories = (userName, searchString="") => (dispatch) =>  {
        const url = getUserReposRequestURL(searchString.trim(), userName.trim());
        fetch(url)
            .then(response => {
                if (response.ok)
                    return response.json();
                else throw new Error(`Request error`)
            })
            .then(data => data.items.map(repo => repo.name))
            .then(repos => dispatch(ReceiveUserRepos(repos)))
            .catch(logError);
};




