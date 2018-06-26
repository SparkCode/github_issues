import { connect } from 'react-redux';
import IssueDetail from '../../components/IssueDetail';

const mapStateToProps = (immutableState, ownProps) => {
  const state = immutableState.toJS();
  const { issueNumber } = ownProps;
  const issue = state.home.issues.data.find(i => i.number === issueNumber);
  return { ...issue }; // эм
};

export default connect(mapStateToProps)(IssueDetail);
