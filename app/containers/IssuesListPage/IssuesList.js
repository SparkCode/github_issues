import { connect } from 'react-redux';
import IssuesList from 'components/IssuesList';
import { selectIssuesData } from './selectors';
import { goToIssue } from './actions';

const mapStateToProps = state => ({
  issues: selectIssuesData(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName, issuesCount }) => ({
  onIssueTitleClick: number => dispatch(goToIssue({ number, userName, repoName, issuesCount })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesList);
