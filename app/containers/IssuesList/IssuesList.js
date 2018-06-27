import { connect } from 'react-redux';
import IssuesList from '../../components/IssuesList';
import { gotoIssue } from '../../actionCreators';
import { selectIssues, selectIssuesData } from 'selectors';

const mapStateToProps = (immutableState) => ({
  issues: selectIssuesData(immutableState),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { userName, repoName } = ownProps;
  return {
    onIssueTitleClick: (issueId) =>
      dispatch(gotoIssue({ issueId, userName, repoName })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesList);
