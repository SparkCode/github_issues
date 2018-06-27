import { githubAccessToken } from '../../appConfig.json';

export const hostname = `https://api.github.com`;

export const getIssuesPath = (userName, repoName, issuesCount, pageNumber) => ({
  path: `/repos/${userName}/${repoName}/issues`,
  queryParams: {
    per_page: issuesCount,
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

const constructUrl = ({ path, queryParams: pathQueryParams = {} }) => {
  const queryParams = { access_token: githubAccessToken, ...pathQueryParams };
  const queryString = Object.keys(queryParams).reduce(
    (acc, curr) =>
      `${acc}${acc.length ? '&' : '?'}${curr}=${queryParams[curr]}`,
    '',
  );
  return hostname + path + queryString;
};

export const getIssueUrl = (userName, repoName, issueNumber) =>
  `${constructUrl(getIssuePath(userName, repoName, issueNumber))}`;

export const getIssuesUrl = (userName, repoName, issuesCount, pageNumber) =>
  `${constructUrl(getIssuesPath(userName, repoName, issuesCount, pageNumber))}`;

export const getIssuesPagesCountUrl = (userName, repoName) =>
  `${constructUrl(getReposInformationPath(userName, repoName))}`;

export const getUserReposUrl = (userName, searchString) =>
  `${constructUrl(getUserReposPath(userName, searchString))}`;
