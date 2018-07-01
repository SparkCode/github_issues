import { connect } from 'react-redux';
import IssueDetail from 'components/IssueDetail';
import { selectIssue } from 'selectors/index';

const mapStateToProps = (state, { issueNumber }) => selectIssue(state, issueNumber);

export default connect(mapStateToProps)(IssueDetail);
