import {INVALIDATE_ISSUES, INVALIDATE_USER_REPOSITORIES, RECEIVE_ISSUES, RECEIVE_USER_REPOSITORIES} from "./constants"
import { push } from 'react-router-redux'
import logError from "../utils"

const invalidateIssues = () => {
    return {
        type: INVALIDATE_ISSUES
    }
};

const ReceiveIssues = ({issues, issuesPagesCount}) => {
    return {
        type: RECEIVE_ISSUES,
        issues,
        issuesPagesCount
    }
};

const ReceiveUserRepos = (repos) => {
    return {
        type: RECEIVE_USER_REPOSITORIES,
        repos
    }
};

export const InvalidateUserRepos = () => {
    return {
        type: INVALIDATE_USER_REPOSITORIES
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
    dispatch(fetchIssues({userName, repoName, ...props}));
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    let url = getIssuesRequestURL(userName.trim(), repoName.trim(), issuesCount.trim(), pageNumber.trim());
    const promise1 = fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else throw new Error(`Request error`)
        })
        .then(data => data.map(x => {return {id: x.id, number: x.number, title: x.title, created_at: x.created_at}}))
        .then(issues => {return {issues}});

    url = getReposInformationRequestURL(userName.trim(), repoName.trim());
    const promise2 = fetch(url)
        .then(response => {

            if (response.ok)
                return response.json();
            else throw new Error(`Request error`)
        })
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            return {issuesPagesCount}
        });

    Promise.all([promise1, promise2])
        .then(array => {
            const data = array.reduce((acc, value) => { return {...acc, ...value}} , {});
            dispatch(ReceiveIssues(data));
        })
        .catch(logError)
};

export const loadUserRepositories = (userName, searchString="") =>  {
    const thunk = (dispatch) => { //todo: should debounce
        if (!userName.length)
            return;
        if (!searchString)
            dispatch(InvalidateUserRepos());
        const url = getUserReposRequestURL(searchString.trim(), userName.trim());
        fetch(url)
            .then(response => {
                if (response.ok)
                    return response.json();
                else throw new Error(`Request error`)
            })
            .then(data => data.items.map(repo => repo.name))
            .then(repos => dispatch(ReceiveUserRepos(repos)))
            .catch(logError)
    };

    thunk.meta = {
        debounce: {
            time: 500,
            immediate: true,
            key: 'LOAD_USER_REPOS'
        }
    };


    return thunk;
};




