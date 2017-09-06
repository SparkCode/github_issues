import {connect} from "react-redux";
import IssuesList from "../../components/IssuesList";
import {gotoIssue} from "../../actionCreators";

const mapStateToProps = (state) => {
    const {data} = state.issues;
    return {
        issues: data
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {userName, repoName} = ownProps;
    return {
        onIssueTitleClick: (issueId) => dispatch((gotoIssue({issueId, userName, repoName})))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesList);