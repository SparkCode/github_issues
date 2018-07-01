import { connect } from 'react-redux';
import IssuesList from 'components/IssuesList';
import { gotoIssue } from 'actionCreators';
import { selectIssuesData } from 'selectors/index';

const mapStateToProps = state => ({
  issues: selectIssuesData(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName }) => ({
  onIssueTitleClick: number => dispatch(gotoIssue({ number, userName, repoName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesList);
