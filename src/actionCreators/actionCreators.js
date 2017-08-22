import {INVALIDATE_ISSUES, RECEIVE_ISSUES} from "./constants"
import { push  } from 'react-router-redux'

export const invalidateIssues = () => {
    return {
        type: INVALIDATE_ISSUES
    }
};

const ReceiveIssues = (issues) => {
    return {
        type: RECEIVE_ISSUES,
        issues: issues
    }
};


export const searchIssues = (userName, repoName) => (dispatch) => {
    dispatch(
        push({
            search: `?userName=${userName}&repoName=${repoName}`
        })
    );
    dispatch(invalidateIssues());
};



const shouldUpdateIssues = (state, userName, repoName) => {
      return state.issues.didInvalidate && userName && repoName;
};

export const fetchIssuesIfNeeded = (location) => (dispatch, getState) => {
    const state = getState();
    const {userName, repoName} = location.query;
    if (!shouldUpdateIssues(state, userName, repoName))
        return;
    dispatch(fetchIssues(userName, repoName));
};

export const fetchIssues = (userName, repoName) => (dispatch) => {
    fetch(`https://api.github.com/repos/${userName}/${repoName}/issues`)
        .then(response => response.json())
        .then(data => data.map(x => {return {id: x.id, number: x.number, title: x.title, created_at: x.created_at}}))
        .then(issues => dispatch(ReceiveIssues(issues)))
        .catch(e => `Error in fetchIssues: ${e}`);
};



