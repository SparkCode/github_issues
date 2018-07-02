import { connect } from 'react-redux';
import IssuesList from 'components/IssuesList';
import { goToIssue } from 'actionCreators';
import { selectIssuesData } from 'selectors/index';

const mapStateToProps = state => ({
  issues: selectIssuesData(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName }) => ({
  onIssueTitleClick: number => dispatch(goToIssue({ number, userName, repoName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesList);
