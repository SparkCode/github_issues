import {connect} from "react-redux";
import HomePage from "../../pages/HomePage";
const isIssuesCountValid = (issuesCount, issuesCountOptions) => {
    return issuesCountOptions.indexOf(issuesCount) !== -1;
};

const mapStateToProps = (state, ownProps) => {
    const {userName, repoName} = ownProps.params;
    const {issuesCount} = ownProps.location.query;
    const {issuesCountOptions, defaultIssuesCountOption} = state.issues.paging;
    return {
        userName,
        repoName,
        issuesCount: isIssuesCountValid(issuesCount, issuesCountOptions) ? issuesCount : defaultIssuesCountOption
    }
};

export default connect(mapStateToProps)(HomePage);