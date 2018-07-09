// todo: should be no here
import { connect } from 'react-redux';
import StatusIssuesBar from 'components/StatusIssuesBar';
import { selectIssues, selectIsNoIssuesReceived } from 'containers/IssuesListPage/selectors';

const mapStateToProps = state => {
  const { isFetching, isRequestFailed, errorMessage } = selectIssues(state);
  return {
    issuesIsLoading: isFetching,
    isRequestFailed,
    errorMessage,
    noIssuesReceived: selectIsNoIssuesReceived(state),
  };
};

export default connect(mapStateToProps)(StatusIssuesBar);
