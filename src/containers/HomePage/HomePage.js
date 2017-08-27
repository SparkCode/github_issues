import HomePage from "../../components/HomePage/HomePage";
import {connect} from "react-redux";

const isIssuesCountValid = (issuesCount, issuesCountOptions) => {
    return issuesCountOptions.indexOf(issuesCount) !== -1;
};

const isPageNumberValid = (pageNumber, issuesPagesCount) => {
     if (!Number.isInteger(pageNumber))
         return false;
    return (issuesPagesCount && pageNumber <= issuesPagesCount && pageNumber > 0) || !issuesPagesCount;
};

const isUserNameValid = (userName, repoName) => {
    return userName && repoName;
};

const isRepoNameValid = (userName, repoName) => {
    return userName && repoName;
};

const mapStateToProps = (state, ownProps) => {

    const {issuesCountOptions, defaultIssuesCountOption, issuesPagesCount} = state.issues.paging;
    const issues = state.issues.data;
    const {issuesCount, pageNumber, userName, repoName, ...props} = ownProps.location.query;
    return {
        validatedQuery: {
            issuesCount: isIssuesCountValid(issuesCount, issuesCountOptions) ? issuesCount : defaultIssuesCountOption,
            pageNumber: isPageNumberValid(pageNumber, issuesPagesCount) ? pageNumber : "1",
            userName: isUserNameValid(userName, repoName) ? userName : undefined,
            repoName: isRepoNameValid(userName, repoName) ? repoName : undefined,
            ...props},
        shouldShowPaging: Number.isInteger(issuesPagesCount) && issuesPagesCount > 1 && issues.length > 1
    }
};

export default connect(mapStateToProps)(HomePage);