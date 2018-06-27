import { connect } from 'react-redux';
import IssueDetail from '../../components/IssueDetail';
import { selectIssue } from 'selectors';

const mapStateToProps = (immutableState, { issueNumber }) =>
  selectIssue(immutableState, issueNumber);

export default connect(mapStateToProps)(IssueDetail);
