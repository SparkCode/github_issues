import fetch from "isomorphic-fetch";

export const hostname = 'https://api.github.com';

export const getIssuesPath = (userName, repoName, issuesCount, pageNumber) =>
    `/repos/${userName}/${repoName}/issues?&per_page=${issuesCount}&page=${pageNumber}`;

export const getReposInformationPath = (userName, repoName) =>
    `/repos/${userName}/${repoName}`;

export const getUserReposPath = (userName, searchString) =>
    `/search/repositories?q=${searchString}+user:${userName}`;

export const getIssuePath = (userName, repoName, issueNumber) =>
    `/repos/${userName}/${repoName}/issues/${issueNumber}`;

const constructUrl = path => hostname + path;

export const getIssue = (userName, repoName, issueNumber) => {
    const url = constructUrl(getIssuePath(userName, repoName, issueNumber));
    return sendRequest(url);
};

export const getIssues = (userName, repoName, issuesCount, pageNumber) => {
    const url = constructUrl(getIssuesPath(userName, repoName, issuesCount, pageNumber));
    return sendRequest(url);
};

export const getIssuesPagesCount = (userName, repoName) => {
    const url = constructUrl(getReposInformationPath(userName, repoName));
    return sendRequest(url);
};

export const getUserRepos = (userName, searchString) => {
    const url = constructUrl(getUserReposPath(userName, searchString));
    return sendRequest(url);
};

const sendRequest = (url) =>
    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.statusText) //todo use onReject and pass response?
        });