import {connect} from "react-redux";
import IssueDetailPage from "../../pages/IssueDetailPage";
import {fetchIssueIfNeeded} from "../../actionCreators";

const mapStateToProps = (state, ownProps) => {
    const {didInvalidate, isFething, isRequestFailed} = state.issues;
    const {issueNumber, userName, repoName} = ownProps.params;
    const issueBeLoaded = !didInvalidate && !isFething && !isRequestFailed;
    return {
        issueBeLoaded,
        issueNumber,
        userName,
        repoName
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {userName, repoName, issueNumber} = ownProps.params;
    return {
        fetchIssueIfNeeded: () => dispatch(fetchIssueIfNeeded({userName, repoName, issueNumber}))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailPage);