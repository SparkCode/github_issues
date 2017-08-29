import {
    INVALIDATE_ISSUES, RECEIVE_ISSUES, RECEIVE_ISSUES_ERROR, RECEIVE_ISSUES_PAGES_COUNT,
    RECEIVE_USER_REPOSITORIES, REQUEST_ISSUES
} from "./constants"
import { push } from 'react-router-redux'
import logError from "../utils"

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

const ReceiveIssuesError = () => {
    return {
        type: RECEIVE_ISSUES_ERROR
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
    dispatch(
        push({
            search: `?userName=${userName}&repoName=${repoName}&issuesCount=${issuesCount}&pageNumber=${pageNumber}`
        })
    );
    dispatch(invalidateIssues());
};

const shouldUpdateIssues = (state, userName, repoName) => {
      return state.issues.didInvalidate && userName && repoName;
};

const getIssuesRequestURL = (userName, repoName, issuesCount, pageNumber) =>
    `https://api.github.com/repos/${userName}/${repoName}/issues?&per_page=${issuesCount}&page=${pageNumber}`;

const getReposInformationRequestURL = (userName, repoName) =>
    `https://api.github.com/repos/${userName}/${repoName}`;

const getUserReposRequestURL = (searchString, userName) =>
    `https://api.github.com/search/repositories?q=${searchString}+user:${userName}`;

export const fetchIssuesIfNeeded = (query) => (dispatch, getState) => {
    const state = getState();
    const {userName, repoName, ...props} = query;
    if (!shouldUpdateIssues(state, userName, repoName))
        return;
    dispatch(RequestIssues());
    dispatch(fetchIssues({userName, repoName, ...props}));
    dispatch(fetchIssuesPagesCount({userName, repoName, ...props}));
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    let url = getIssuesRequestURL(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber.trim());
    fetch(url)
        .then(response => {
            debugger;
            if (response.ok)
                return response.json();
            else throw new Error(`Request error`)
        })
        .then(data => data.map(x => {return {id: x.id, number: x.number, title: x.title, created_at: x.created_at}}))
        .then(issues => dispatch(ReceiveIssues(issues)))
        .catch((e) => {
            debugger;
            dispatch(ReceiveIssuesError());
            logError(e);
        });
};

export const fetchIssuesPagesCount = ({userName, repoName, issuesCount}) => (dispatch) => {
    const url = getReposInformationRequestURL(userName.trim(), repoName.trim());
    fetch(url)
        .then(response => {
            debugger;
            if (response.ok)
                return response.json();
            else throw new Error(`Request error`)
        })
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            dispatch(ReceiveIssuesPagesCount(issuesPagesCount));
        })
        .catch((e) => logError(e));
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
            .catch(e => logError(e));
};




