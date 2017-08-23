import HomePage from "../../components/HomePage/HomePage";
import {connect} from "react-redux";


const isIssuesCountValid = (issuesCount, issuesCountOptions) => {
    return issuesCountOptions.indexOf(issuesCount) !== -1;
};

const isPageNumberValid = (pageNumber, issuesPagesCount) => {
    return (issuesPagesCount && pageNumber <= issuesPagesCount) || !issuesPagesCount;
};

const mapStateToProps = (state, ownProps) => {
    const {issuesCountOptions, defaultIssuesCountOption, issuesPagesCount} = state.issues.paging;
    const {issuesCount, pageNumber, ...props} = ownProps.location.query;
    return {
        validatedQuery: {
            issuesCount: isIssuesCountValid(issuesCount, issuesCountOptions) ? issuesCount : defaultIssuesCountOption,
            pageNumber: isPageNumberValid(pageNumber, issuesPagesCount) ? pageNumber : 1,
            ...props},
        issuesPagesCount: +issuesPagesCount
    }
};

export default connect(mapStateToProps)(HomePage);