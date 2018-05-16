export const hostname = 'https://api.github.com';

export const getIssuesPath = (userName, repoName, issuesCount, pageNumber) =>
  `/repos/${userName}/${repoName}/issues?&per_page=${issuesCount}&page=${pageNumber}`;

export const getReposInformationPath = (userName, repoName) =>
  `/repos/${userName}/${repoName}`;

export const getUserReposPath = (userName, searchString) =>
  `/search/repositories?q=${searchString}+user:${userName}`;

export const getIssuePath = (userName, repoName, issueNumber) =>
  `/repos/${userName}/${repoName}/issues/${issueNumber}`;

const constructUrl = (path) => hostname + path;

export const getIssueUrl = (userName, repoName, issueNumber) =>
  constructUrl(getIssuePath(userName, repoName, issueNumber));

export const getIssuesUrl = (userName, repoName, issuesCount, pageNumber) =>
  constructUrl(getIssuesPath(userName, repoName, issuesCount, pageNumber));

export const getIssuesPagesCountUrl = (userName, repoName) =>
  constructUrl(getReposInformationPath(userName, repoName));

export const getUserReposUrl = (userName, searchString) =>
  constructUrl(getUserReposPath(userName, searchString));
