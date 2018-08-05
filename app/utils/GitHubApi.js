export const hostname = `https://api.github.com`;

export const getIssuesPath = (userName, repoName, issuesCountOnPage, pageNumber) => ({
  path: `/repos/${userName}/${repoName}/issues`,
  queryParams: {
    per_page: issuesCountOnPage,
    page: pageNumber,
  },
});

export const getReposInformationPath = (userName, repoName) => ({
  path: `/repos/${userName}/${repoName}`,
});

export const getUserReposPath = (userName, searchString) => ({
  path: `/search/repositories`,
  queryParams: {
    q: `${searchString}+user:${userName}`,
  },
});

export const getIssuePath = (userName, repoName, issueNumber) => ({
  path: `/repos/${userName}/${repoName}/issues/${issueNumber}`,
});

export const makePathString = ({ queryParams = {}, path }) =>
  path +
  Object.keys(queryParams).reduce((acc, curr) => `${acc}${acc.length ? '&' : '?'}${curr}=${queryParams[curr]}`, '');

export const withAccessToken = ({ queryParams, path }, accessToken) => ({
  queryParams: {
    access_token: accessToken,
    ...queryParams,
  },
  path,
});

const constructUrl = path =>
  // eslint-disable-next-line no-undef
  hostname + makePathString(GITHUB_ACCESS_TOKEN ? withAccessToken(path, GITHUB_ACCESS_TOKEN) : path);

export const getIssueUrl = (userName, repoName, issueNumber) =>
  `${constructUrl(getIssuePath(userName, repoName, issueNumber))}`;

export const getIssuesUrl = (userName, repoName, issuesCountOnPage, pageNumber) =>
  `${constructUrl(getIssuesPath(userName, repoName, issuesCountOnPage, pageNumber))}`;

export const getIssuesPagesCountUrl = (userName, repoName) =>
  `${constructUrl(getReposInformationPath(userName, repoName))}`;

export const getUserReposUrl = (userName, searchString) => `${constructUrl(getUserReposPath(userName, searchString))}`;
