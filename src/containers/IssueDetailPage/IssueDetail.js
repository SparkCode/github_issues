import IssueDetail from "../../components/IssueDetail";
import {connect} from "react-redux";
const mapStateToProps = (state, ownProps) => {
    const {issueNumber} = ownProps;
    const issue = state.issues.data.find(i => i.number === issueNumber);
    return {...issue}
};

export default connect(mapStateToProps)(IssueDetail);