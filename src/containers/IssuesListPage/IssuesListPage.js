import IssuesListPage from "../../pages/IssuesListPage";
import {connect} from "react-redux";
import {fetchIssuesIfNeeded} from "../../actionCreators";
import {isIssuesCountValid, isPageNumberValid} from "../index";

const mapStateToProps = (state, ownProps) => {

    const {issuesCountOptions, defaultIssuesCountOption, issuesPagesCount} = state.issues.paging;
    const issues = state.issues.data;
    const {userName, repoName} = ownProps.params;
    const {issuesCount, pageNumber} = ownProps.location.query;
    return {
        shouldShowPaging: !isNaN(issuesPagesCount) && issuesPagesCount > 1 && issues.length > 1,
        issuesCount: isIssuesCountValid(issuesCount, issuesCountOptions) ? issuesCount : defaultIssuesCountOption,
        pageNumber: isPageNumberValid(pageNumber, issuesPagesCount) ? pageNumber : "1",
        userName,
        repoName
    }
};

const mapDispatchToProps = {fetchIssuesIfNeeded};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesListPage);