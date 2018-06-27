import { connect } from 'react-redux';
import IssuesList from 'components/IssuesList';
import { gotoIssue } from 'actionCreators';
import { selectIssues, selectIssuesData } from 'selectors';

const mapStateToProps = state => ({
  issues: selectIssuesData(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName }) => ({
  onIssueTitleClick: issueId => dispatch(gotoIssue({ issueId, userName, repoName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesList);
