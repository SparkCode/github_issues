export const makeIssueUrl = (userName, repoName, number, issuesCountOnPage) =>
  `/${userName}/${repoName}/${number}?issuesCountOnPage=${issuesCountOnPage}`;

export const makeIssuesListUrl = (userName, repoName, issuesCountOnPage, pageNumber) =>
  `/${userName}/${repoName}?issuesCountOnPage=${issuesCountOnPage}&pageNumber=${pageNumber}`;
