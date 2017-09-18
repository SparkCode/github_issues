export const isIssuesCountValid = (issuesCount, issuesCountOptions) => {
    return issuesCountOptions.indexOf(issuesCount) !== -1;
};


export const isPageNumberValid = (pageNumber, issuesPagesCount) => {
    if (isNaN(pageNumber))
        return false;
    else
        return (issuesPagesCount && pageNumber <= issuesPagesCount && pageNumber > 0) || !issuesPagesCount;
};
