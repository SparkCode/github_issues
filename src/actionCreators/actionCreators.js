import {INVALIDATE_ISSUES, RECEIVE_ISSUES} from "./constants"
import { push } from 'react-router-redux'

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

export const fetchIssuesIfNeeded = (query) => (dispatch, getState) => {
    const state = getState();
    const {userName, repoName, ...props} = query;
    if (!shouldUpdateIssues(state, userName, repoName))
        return;
    dispatch(fetchIssues({userName, repoName, ...props}));
};

export const fetchIssues = ({userName, repoName, issuesCount, pageNumber}) => (dispatch) => {
    const promise1 = fetch(`https://api.github.com/repos/${userName}/${repoName}/issues?&per_page=${issuesCount}&page=${pageNumber}`)
        .then(response => response.json())
        .then(data => data.map(x => {return {id: x.id, number: x.number, title: x.title, created_at: x.created_at}}))
        .then(issues => {return {issues}});

    const promise2 = fetch(`https://api.github.com/repos/${userName}/${repoName}`)
        .then(response => response.json())
        .then(data => {
            const overallIssues = data.open_issues_count;
            const issuesPagesCount = Math.ceil(overallIssues / issuesCount);
            return {issuesPagesCount}
        });

    Promise.all([promise1, promise2])
        .then(array => {
            const data = array.reduce((acc, value) => { return {...acc, ...value}} , {});
            dispatch(ReceiveIssues(data));
        });
};



