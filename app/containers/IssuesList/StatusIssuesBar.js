import { connect } from 'react-redux';
import StatusIssuesBar from 'components/StatusIssuesBar';
import { selectIssues, selectIsNoIssuesReceived } from './selectors';

// todo: code duplication
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
