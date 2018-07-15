export const makeIssueUrl = (userName, repoName, number, issuesCountOnPage) =>
  `/github-issues/${userName}/${repoName}/${number}?issuesCountOnPage=${issuesCountOnPage}`;

export const makeIssuesListUrl = (userName, repoName, issuesCountOnPage, pageNumber) =>
  `/github-issues/${userName}/${repoName}?issuesCountOnPage=${issuesCountOnPage}&pageNumber=${pageNumber}`;
